FROM node:20.11
WORKDIR /
COPY . /
RUN corepack enable && corepack prepare pnpm@9.0.6 --activate
RUN npm add --global nx@latest
RUN pnpm run portal:build

CMD [ "pnpm", "run", "portal:start" ]
