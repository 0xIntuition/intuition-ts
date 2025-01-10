# Stage 1: Set up Anvil
FROM ./docker/Dockerfile AS anvil

# Stage 2: Build and run the application
FROM ubuntu:22.04

# Install Node.js and build dependencies
RUN apt-get update && \
    apt-get install -y curl build-essential git && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g pnpm && \
    rm -rf /var/lib/apt/lists/*

# Copy Anvil from first stage
COPY --from=anvil /root/.foundry/bin/anvil /usr/local/bin/
COPY --from=anvil /app /app/

# Set up workspace
WORKDIR /workspace
COPY ../../package.json ../../pnpm-lock.yaml ./
COPY ../../packages ./packages

# Set up app
WORKDIR /workspace/apps/bonding-curves
COPY . .

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