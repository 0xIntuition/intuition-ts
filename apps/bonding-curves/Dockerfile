# Stage 1: Set up Anvil
FROM ubuntu:22.04 AS anvil

# Install dependencies
RUN apt-get update && \
    apt-get install -y curl build-essential git && \
    rm -rf /var/lib/apt/lists/*

# Install Foundry
RUN curl -L https://foundry.paradigm.xyz | bash
ENV PATH="/root/.foundry/bin:${PATH}"
RUN foundryup

WORKDIR /app

# Copy files exactly as they're mounted in docker-compose
COPY apps/bonding-curves/lib/ /app/lib/
COPY apps/bonding-curves/foundry.toml /app/foundry.toml
COPY apps/bonding-curves/remappings.txt /app/remappings.txt
RUN mkdir -p /app/contracts
COPY apps/bonding-curves/contracts/BaseCurve.sol /app/contracts/

# Stage 2: Build and run the application
FROM node:20

WORKDIR /app

# Copy Anvil from first stage
COPY --from=anvil /root/.foundry/bin/anvil /usr/local/bin/
COPY --from=anvil /app /app/

# Install pnpm
RUN npm install -g pnpm@9.0.6

# Copy workspace files first
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY nx.json tsconfig.base.json ./
COPY packages ./packages
COPY apps ./apps

# Install dependencies and build workspace packages
RUN pnpm install --frozen-lockfile --production=false

# Build the app (which will also build dependencies)
RUN cd apps/bonding-curves && pnpm run build

# Prune dev dependencies
RUN pnpm prune --prod

# Expose ports
EXPOSE 8080 8545

# Start both services
CMD anvil --host 0.0.0.0 --chain-id 31337 & cd apps/bonding-curves && exec pnpm start 