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

WORKDIR /app

# Set up Foundry files (matching local bind mounts)
COPY lib/ /app/lib/
COPY foundry.toml /app/foundry.toml
COPY remappings.txt /app/remappings.txt
COPY contracts/ /app/contracts/

# Copy application files
COPY . .

# Install dependencies and build
RUN pnpm install --no-frozen-lockfile && \
    pnpm run build

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
PORT=8080 pnpm start' > /app/start.sh && \
chmod +x /app/start.sh

# Expose ports
EXPOSE 8080 8545

CMD ["/app/start.sh"] 