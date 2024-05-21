FROM ubuntu:20.04

SHELL ["/bin/bash", "-c"]

RUN apt update

RUN apt install -y curl git

# install foundry
RUN curl -L https://foundry.paradigm.xyz | bash

RUN /root/.foundry/bin/foundryup

# need to set the directory so `forge script` can do relative imports
WORKDIR /root

# Command to start the anvil service
# Add your flags commands here
ENV ANVIL_START='/root/.foundry/bin/anvil --host 0.0.0.0'

# Execute the scripts after the anvil service is started
CMD $ANVIL_START
