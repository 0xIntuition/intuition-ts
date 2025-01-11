# Docker/Anvil Usage in Code

## package.json

```json
"dev": "docker compose down && docker compose up -d anvil && remix vite:dev"
```

## api.compile.ts

```typescript
// Docker exec commands for development
;`docker exec bonding-curves-anvil-1 bash -c "echo '${escapedContent}' > ${contractPath}"``docker exec bonding-curves-anvil-1 forge build --force --sizes``docker exec bonding-curves-anvil-1 cat ${artifactPath}``docker exec bonding-curves-anvil-1 rm /app/contracts/${fileName}`
```

## api.deploy.ts

```typescript
const ANVIL_URL = process.env.ANVIL_RPC_URL || 'http://127.0.0.1:8545'
const ANVIL_ACCOUNT = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
```

## contract-utils.ts

```typescript
await publicClient.request({
  method: 'anvil_setStorageAt' as any,
  params: [address, `0x${slot.toString(16)}`, `0x${hexValue}`],
})
```

## api.compile-and-deploy.ts

```typescript
// Custom chain configuration for Anvil
name: 'Local Anvil'
account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' // Default Anvil account
```

## Environment Variables (.env.example)

```
ANVIL_RPC_URL=http://localhost:8545
```

## Dockerfile

```dockerfile
# Anvil setup
anvil --host 0.0.0.0 --chain-id 31337

# Port exposure
EXPOSE 10000 8545

# Environment variables
ENV ANVIL_RPC_URL=http://127.0.0.1:8545
```
