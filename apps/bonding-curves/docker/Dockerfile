FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && \
    apt-get install -y curl build-essential git && \
    rm -rf /var/lib/apt/lists/*

# Install Foundry
RUN curl -L https://foundry.paradigm.xyz | bash
ENV PATH="/root/.foundry/bin:${PATH}"
RUN foundryup

WORKDIR /app

# Copy lib and config
COPY lib/ /app/lib/
COPY foundry.toml /app/foundry.toml
COPY remappings.txt /app/remappings.txt

# Create contracts directory and copy BaseCurve
RUN mkdir -p /app/contracts
COPY contracts/BaseCurve.sol /app/contracts/

# Expose default Anvil port
EXPOSE 8545

# Start Anvil with specified parameters
CMD ["/root/.foundry/bin/anvil", "--host", "0.0.0.0", "--chain-id", "31337"] 