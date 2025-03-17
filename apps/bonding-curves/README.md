# Bonding Curve Visualizer

Interactive visualization tool for bonding curves with EVM integration.

## Features

- Visual comparison of bonding curves
- Parameter tweaking for curve customization
- Real-time curve updates
- EVM integration for byte-precise calculations
- Support for linear and logarithmic curves

## Curve Types

### Linear Curve

The simplest curve possible, where the number of shares awarded is directly proportional to the number of assets staked.

### Logarithmic Curve

A curve designed to incentivize early stakers and disincentivize late stakers. It uses the following parameters:

- Scale: Controls how gentle the curve is (default: 2e18)
- Offset: Controls how gentle the curve is initially (default: 1)

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Start the local EVM node:

```bash
anvil --host 0.0.0.0 --chain-id 1337 --block-time 12
```

3. Start the development server:

```bash
pnpm dev
```

## Development

The app is built with:

- Remix for the framework
- D3.js for visualizations
- Viem for EVM interactions
- Foundry/Anvil for local EVM testing

### Project Structure

```
apps/bonding-curves/
├── app/
│   ├── components/         # React components
│   │   ├── BondingCurveChart.tsx
│   │   └── CurveControls.tsx
│   ├── lib/               # Utility functions
│   │   └── curveCalculations.ts
│   └── routes/            # Remix routes
│       └── _index.tsx
├── contracts/             # Solidity contracts
│   ├── BaseCurve.sol
│   ├── LinearCurve.sol
│   └── LogarithmicCurve.sol
└── scripts/              # Deployment scripts
    └── deploy.ts
```

### Adding New Curve Types

1. Create a new contract that implements the `BaseCurve` interface
2. Add the curve type to the `CurveParameters` interface in `CurveControls.tsx`
3. Implement the curve calculations in `curveCalculations.ts`
4. Add the curve type to the dropdown in `CurveControls.tsx`

## Testing

To test with different EVM configurations:

1. Modify the Anvil settings when starting the node
2. Deploy the contracts using the deployment script:

```bash
pnpm ts-node scripts/deploy.ts
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request
