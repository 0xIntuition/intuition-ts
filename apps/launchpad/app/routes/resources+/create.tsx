import { json } from '@remix-run/node'
import { getMultivaultContract, publicClient } from '@server/viem'

export type CreateLoaderData = {
  vaultId: string
  atomCost: string
  atomCreationFee: string
  tripleCost: string
  protocolFee: string
  entryFee: string
  feeDenominator: string
  minDeposit: string
}

interface MulticallResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result?: any
  error?: Error
  status: 'failure' | 'success'
}

export async function loader() {
  // Base vault id
  const vid = BigInt(0)

  const coreContractConfigs = [
    {
      ...getMultivaultContract,
      functionName: 'getAtomCost',
      args: [],
    },
    {
      ...getMultivaultContract,
      functionName: 'getTripleCost',
      args: [],
    },
    {
      ...getMultivaultContract,
      functionName: 'atomConfig',
      args: [],
    },
    {
      ...getMultivaultContract,
      functionName: 'vaultFees',
      args: [vid],
    },
    {
      ...getMultivaultContract,
      functionName: 'generalConfig',
      args: [],
    },
  ]

  const resp: MulticallResponse[] = await publicClient.multicall({
    contracts: coreContractConfigs,
  })

  const atomCost = resp[0].result as bigint
  const tripleCost = resp[1].result as bigint
  const [, atomCreationFee] = resp[2].result as bigint[]
  const [entryFee, , protocolFee] = resp[3].result as bigint[]
  const [, , feeDenominator, minDeposit] = resp[4].result as [
    string,
    string,
    bigint,
    bigint,
  ]

  return json({
    vaultId: vid.toString(),
    atomCost: atomCost.toString(),
    tripleCost: tripleCost.toString(),
    atomCreationFee: atomCreationFee.toString(),
    protocolFee: protocolFee.toString(),
    entryFee: entryFee.toString(),
    feeDenominator: feeDenominator.toString(),
    minDeposit: minDeposit.toString(),
  } as CreateLoaderData)
}
