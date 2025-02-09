FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install --global corepack@latest
RUN corepack enable

FROM base AS build
ARG PACKAGE_NAME
COPY . /usr/src/build
WORKDIR /usr/src/build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --frozen-lockfile --filter $PACKAGE_NAME...
RUN pnpm run --filter=$PACKAGE_NAME... -r build
RUN pnpm deploy --filter=$PACKAGE_NAME --prod /usr/src/app

FROM base
COPY --from=build /usr/src/app /usr/src/app
WORKDIR /usr/src/app
CMD [ "pnpm", "start" ]
