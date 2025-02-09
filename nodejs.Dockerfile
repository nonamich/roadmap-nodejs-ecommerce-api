FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apt-get update -y && apt-get install -y openssl
RUN corepack enable && \
    corepack prepare pnpm@9.15.4 --activate

FROM base AS packages
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter "@packages/*" build
RUN pnpm --filter "@apps/*" --filter= "!@apps/frontend" --parallel build

FROM base AS build
ARG APP_DIR
WORKDIR /app
COPY --from=packages /app .
RUN pnpm deploy --filter ./apps/$APP_DIR --prod /prod/$APP_DIR

FROM base AS runner
ARG APP_DIR
WORKDIR /app
COPY --from=build /prod/$APP_DIR .
CMD ["pnpm", "start"]


