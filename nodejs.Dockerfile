FROM node:22-slim AS base
ARG CURRENT_PACKAGE
ENV PNPM_NO_UPDATE_NOTIFIER=true
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apt-get update -y && apt-get install -y openssl
RUN corepack enable && \
    corepack prepare pnpm@9.15.4 --activate
RUN pnpm config set notify-update false -g

FROM base AS packages
WORKDIR /usr/src/packages
COPY . .
RUN find . \( -name "package.json" -o -name "pnpm-lock.yaml" -o -name "pnpm-workspace.yaml" \) \
    | tar -czf packages.tar.gz -T -
RUN tar -xzf packages.tar.gz -C /app

FROM base AS install
WORKDIR /app
COPY --from=packages /app .
RUN ls && sleep 5
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --frozen-lockfile --filter $CURRENT_PACKAGE...

FROM base AS build
WORKDIR /app
COPY --from=install /app .
RUN pnpm run --filter $CURRENT_PACKAGE... -r build
RUN pnpm prune --prod

FROM base
WORKDIR /app
COPY --from=build /app .
CMD [ "pnpm", "start" ]
