FROM node:20.2-alpine3.18

ENV NODE_OPTIONS=--max_old_space_size=8096

WORKDIR /

RUN npm i -g pnpm@9.0.6 && \
	apk add --no-cache \
	dumb-init=1.2.5-r2
RUN apk add --no-cache \
	python3 \
	make \
	gcc \
	g++

COPY package.json \
    project.json \
	tsconfig* \
	nx.json \
	pnpm-lock.yaml \
    .eslintrc.base.cjs \
	./
COPY apps/portal ./apps/portal
COPY packages ./packages

ENV CYPRESS_INSTALL_BINARY=0

RUN pnpm i

CMD [ "pnpm", "run", "--filter", "portal:dev" ]