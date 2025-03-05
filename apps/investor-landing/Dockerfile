FROM docker.io/node:lts-alpine as base

WORKDIR /app

# Copy things specifically needed for this app
COPY package.json \
    project.json \
	tsconfig* \
	nx.json \
	pnpm*.yaml \
    .eslintrc.base.cjs \
    .verdaccio \
	./
COPY apps/investor-landing ./apps/investor-landing
COPY packages ./packages

# Install necessary packages
# RUN apk add --no-cache \
#     python3 \
#     make \
#     gcc \
#     g++

RUN npm install -g pnpm@9.0.6

# Build stage
FROM base as build

# Install nx globally
RUN npm install -g nx@latest

# Install dependencies
RUN pnpm install

# Build the data-populator app
RUN pnpm run investor-landing:build

# Production stage
FROM base

# Copy built files from the build stage
COPY --from=build /app /app

# Set environment variables for NX
ENV NX_REJECT_UNKNOWN_LOCAL_CACHE=0
ENV PORT=8080
ENV HOST=0.0.0.0

# Expose the application port
EXPOSE 8080

# Start the application
CMD [ "pnpm", "run", "investor-landing:start" ]