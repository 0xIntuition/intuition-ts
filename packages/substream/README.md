# Intuition Substream

## Development

### Running services locally

Requirements:

- [Docker](https://www.docker.com/products/docker-desktop/)

Run this in your terminal:

```
docker compose up -d
```

to stop services and remove data

```
docker compose down && rm -rf data
```

### Running simulations

```
pnpm build
cd simulations
```

Note: all simulations start with deploying EthMultiVault contract and sending ETH to 400 accounts generated from a Mnemonic. These accounts are later used to simulate on-chain interactions. Also firehose requires minimal amount of blocks to start streaming data

#### Simulates profile data creation with waiting for block confirmations

```
pnpm profiles
```

#### Simulates spaming protocol with unknown data

```
pnpm unknown
```

### Explore stream in CLI

```
make gui
```

or

```
make run
```
