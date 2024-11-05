FROM docker.io/node:lts-alpine as base

WORKDIR /app

ARG SECRETS_MANAGER
ARG VITE_DEPLOY_ENV
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION

COPY package.json \
	project.json \
	tsconfig* \
	nx.json \
	pnpm*.yaml \
	.eslintrc.base.cjs \
	.verdaccio \
	./

COPY apps/portal ./apps/portal
COPY packages ./packages

RUN apk add --no-cache \
	python3 \
	make \
	gcc \
	g++ \
	py3-pip \
	jq

RUN pip3 install --no-cache-dir awscli --break-system-packages
RUN npm install -g pnpm@9.0.6

FROM base as build
RUN npm add --global nx@latest
RUN pnpm i
RUN pnpm run portal:build

FROM base
COPY --from=build /app /app

ENV VITE_DEPLOY_ENV=$VITE_DEPLOY_ENV
ENV SECRETS_MANAGER=$SECRETS_MANAGER
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_REGION=$AWS_REGION
ENV NX_REJECT_UNKNOWN_LOCAL_CACHE=0
ENV PORT=8080
ENV HOST=0.0.0.0

EXPOSE 8080

RUN chmod +x ./apps/portal/entrypoint.sh

ENTRYPOINT ["./apps/portal/entrypoint.sh"]
