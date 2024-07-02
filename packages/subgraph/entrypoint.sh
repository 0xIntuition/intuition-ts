#!/bin/sh

/sbin/tini -- /usr/local/bin/start_ipfs

# Add Pinata gateway as a preferred gateway
ipfs config --json Gateway.PublicGateways '{ "gateway.pinata.cloud": { "PathPrefixes": ["/ipfs", "/ipns"], "UseSubdomains": true } }'

# Start the IPFS daemon
ipfs daemon --migrate=true --agent-version-suffix=docker

