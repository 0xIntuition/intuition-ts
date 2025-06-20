import {
  createPublicClient,
  createTestClient,
  createWalletClient,
  http,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { anvil } from 'viem/chains'

// export const anvil = {
//   ...foundry, // We are using a mainnet fork for testing.
//   id: 31337, // We configured our anvil instance to use `123` as the chain id (see `globalSetup.ts`);
//   rpcUrls: {
//     // These rpc urls are automatically used in the transports.
//     default: {
//       // Note how we append the worker id to the local rpc urls.
//       http: [`http://127.0.0.1:8545`],
//       webSocket: [`ws://127.0.0.1:8545`],
//     },
//     public: {
//       // Note how we append the worker id to the local rpc urls.
//       http: [`http://127.0.0.1:8545`],
//       webSocket: [`ws://127.0.0.1:8545`],
//     },
//   },
// } as const satisfies Chain

export const testClient = createTestClient({
  chain: anvil,
  mode: 'anvil',
  transport: http(),
  account: privateKeyToAccount(
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  ),
})

export const publicClient = createPublicClient({
  chain: anvil,
  transport: http(),
})

const aliceAccount = privateKeyToAccount(
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
)

export const walletClient = createWalletClient({
  chain: anvil,
  transport: http(),
  account: aliceAccount,
})
