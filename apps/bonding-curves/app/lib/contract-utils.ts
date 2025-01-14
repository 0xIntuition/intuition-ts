import { parseEther, type Address, type PublicClient } from 'viem'

export interface ConstructorArg {
  name: string
  type: string
  internalType?: string
}

export interface ConstructorArgs {
  args: ConstructorArg[]
  values: Record<string, string>
}

export interface StorageVariable {
  name: string
  slot: number
  type: string
  isImmutable: boolean
  value?: bigint
}

export interface ContractLayout {
  name: string
  variables: StorageVariable[]
}

export function parseConstructorArgs(abi: any[]): ConstructorArg[] {
  const constructor = abi.find((item) => item.type === 'constructor')
  return constructor?.inputs || []
}

export function formatConstructorValues(values: Record<string, string>): string {
  return Object.entries(values)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ')
}

export function prepareConstructorArgs(
  args: ConstructorArg[],
  values: Record<string, string>
): any[] {
  return args.map((arg) => {
    const value = values[arg.name]
    if (arg.type === 'uint256' || arg.type.startsWith('uint')) {
      // Handle ETH values (18 decimals) vs regular uint values
      return arg.name.toLowerCase().includes('eth')
        ? parseEther(value)
        : BigInt(value)
    }
    return value
  })
}

export async function getContractLayout(
  address: Address,
  abi: any[],
  publicClient: PublicClient
): Promise<ContractLayout> {
  const variables: StorageVariable[] = []
  let slot = 0

  // Get all state variables from ABI
  const stateVars = abi.filter(
    item => item.type === 'function' &&
      item.stateMutability === 'view' &&
      item.inputs.length === 0
  )

  for (const v of stateVars) {
    try {
      // Try to read current value
      const value = await publicClient.readContract({
        address,
        abi,
        functionName: v.name,
        args: [] as const
      }) as bigint

      variables.push({
        name: v.name,
        slot: slot++,
        type: v.outputs[0].type,
        isImmutable: false,
        value
      })
    } catch (err) {
      console.error(`Failed to read ${v.name}:`, err)
    }
  }

  return {
    name: address,
    variables
  }
}

export async function writeStorageSlot(
  address: Address,
  slot: number,
  value: bigint,
  publicClient: PublicClient
) {
  console.log("Writing to storage slot")
  console.log('Address: ', address)
  console.log('Slot: ', slot)
  console.log('Value: ', value)

  // Read current value
  const beforeValue = await publicClient.getStorageAt({
    address,
    slot: `0x${slot.toString(16)}`
  })
  console.log('Storage value before:', beforeValue)

  // Convert value to 32-byte hex string
  const hexValue = value.toString(16).padStart(64, '0')

  await publicClient.request({
    method: 'anvil_setStorageAt' as any,
    params: [address, `0x${slot.toString(16)}`, `0x${hexValue}`]
  })

  // Read new value
  const afterValue = await publicClient.getStorageAt({
    address,
    slot: `0x${slot.toString(16)}`
  })
  console.log('Storage value after:', afterValue)
} 