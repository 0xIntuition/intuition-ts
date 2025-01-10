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
FROM ubuntu:22.04

# Install Node.js and build dependencies
RUN apt-get update && \
    apt-get install -y curl build-essential git && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g pnpm@9.0.6 && \
    rm -rf /var/lib/apt/lists/*

# Copy Anvil from first stage
COPY --from=anvil /root/.foundry/bin/anvil /usr/local/bin/
COPY --from=anvil /app /app/

# Set up workspace
WORKDIR /workspace
COPY package.json pnpm-lock.yaml ./
COPY packages ./packages

# Set up app
WORKDIR /workspace/apps/bonding-curves
COPY apps/bonding-curves .

# Install dependencies
WORKDIR /workspace
RUN pnpm install

# Build the application
WORKDIR /workspace/apps/bonding-curves
RUN pnpm run build

# Expose ports
EXPOSE 8080 8545

# Start both services
CMD cd /app && anvil --host 0.0.0.0 --chain-id 31337 & cd /workspace/apps/bonding-curves && PORT=8080 pnpm start 