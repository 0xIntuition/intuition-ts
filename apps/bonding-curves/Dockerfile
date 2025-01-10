FROM ubuntu:22.04

# Install Node.js and build dependencies
RUN apt-get update && \
    apt-get install -y curl build-essential git && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g pnpm && \
    rm -rf /var/lib/apt/lists/*

# Install Foundry
RUN curl -L https://foundry.paradigm.xyz | bash
ENV PATH="/root/.foundry/bin:${PATH}"
RUN foundryup

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

# Set up Foundry files
WORKDIR /workspace/apps/bonding-curves
COPY lib/ ./lib/
COPY foundry.toml ./foundry.toml
COPY remappings.txt ./remappings.txt
COPY contracts/ ./contracts/

# Build the application
RUN pnpm run build

# Create start script
RUN echo '#!/bin/bash\n\
# Start Anvil in the background\n\
anvil --host 0.0.0.0 --chain-id 31337 &\n\
\n\
# Wait for Anvil to be ready\n\
until curl -s -o /dev/null http://localhost:8545; do\n\
  echo "Waiting for Anvil to be ready..."\n\
  sleep 1\n\
done\n\
\n\
# Start the app\n\
PORT=8080 pnpm start' > ./start.sh && \
chmod +x ./start.sh

# Expose ports
EXPOSE 8080 8545

CMD ["./start.sh"] 