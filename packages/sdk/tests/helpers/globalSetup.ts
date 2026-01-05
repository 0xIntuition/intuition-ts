import type { Server } from 'node:http'
import type { Socket } from 'node:net'

import { createPool, createProxy } from '@viem/anvil'

let server: Server | undefined
let pool: ReturnType<typeof createPool> | undefined
const sockets = new Set<Socket>()

export async function setup() {
  pool = createPool()
  server = await createProxy({
    pool,
    options: {
      chainId: 123,
    },
  })

  // Track open sockets so teardown can close them before shutting down the proxy.
  server.on('connection', (socket) => {
    sockets.add(socket)
    socket.on('close', () => sockets.delete(socket))
  })

  await new Promise<void>((resolve, reject) => {
    server!.once('error', reject)
    server!.listen(8545, '::', () => resolve())
  })

  server.unref()
}

export async function teardown() {
  if (!server || !pool) return

  for (const socket of sockets) {
    socket.destroy()
  }
  sockets.clear()

  await new Promise<void>((resolve, reject) => {
    server!.close((error) => (error ? reject(error) : resolve()))
  })

  await pool.empty()
}
