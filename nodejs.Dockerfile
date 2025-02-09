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
RUN mkdir /usr/src/packages-dist
RUN tar -xzf packages.tar.gz -C /usr/src/packages-dist

FROM base AS install
WORKDIR /usr/src/install
COPY --from=packages /usr/src/packages-dist .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --frozen-lockfile --filter $CURRENT_PACKAGE...

FROM base AS build
WORKDIR /usr/src/build
COPY . .
COPY --from=install /usr/src/install .
RUN pnpm --filter $CURRENT_PACKAGE run db:generate
RUN pnpm --filter $CURRENT_PACKAGE... run build
RUN pnpm prune --prod

FROM base
ENV CURRENT_PACKAGE_ENV ${CURRENT_PACKAGE}
WORKDIR /usr/src/app
COPY --from=build /usr/src/build .
CMD pnpm --filter $CURRENT_PACKAGE_ENV start
