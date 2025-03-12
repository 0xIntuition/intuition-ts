import { json } from '@remix-run/node'
import { getMultivaultContract, publicClient } from '@server/viem'

export type CreateTripleLoaderData = {
  vaultId: string
  fees: CreateTripleFeesType
}

export type CreateTripleFeesType = {
  tripleCost: string
  tripleCreationFee: string
  atomDepositFractionOnCreation: string
  atomDepositFractionOnDeposit: string
  entryFee: string
  protocolFee: string
  feeDenominator: string
}

interface MulticallResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result?: any
  error?: Error
  status: 'failure' | 'success'
}

export async function loader() {
  const vid = BigInt(0)

  const coreContractConfigs = [
    {
      ...getMultivaultContract,
      functionName: 'getTripleCost',
      args: [],
    },
    {
      ...getMultivaultContract,
      functionName: 'tripleConfig',
      args: [],
    },
    {
      ...getMultivaultContract,
      functionName: 'generalConfig',
      args: [],
    },
    {
      ...getMultivaultContract,
      functionName: 'vaultFees',
      args: [vid],
    },
  ]

  const resp: MulticallResponse[] = await publicClient.multicall({
    contracts: coreContractConfigs,
  })

  const tripleCost = resp[0].result as bigint
  const [
    tripleCreationFee,
    atomDepositFractionOnCreation,
    atomDepositFractionOnDeposit,
  ] = resp[1].result as bigint[]
  const [, , feeDenominator] = resp[2].result as [string, string, bigint]
  const [entryFee, , protocolFee] = resp[3].result as bigint[]

  return json({
    vaultId: vid.toString(),
    fees: {
      tripleCost: tripleCost.toString(),
      tripleCreationFee: tripleCreationFee.toString(),
      atomDepositFractionOnCreation: atomDepositFractionOnCreation.toString(),
      atomDepositFractionOnDeposit: atomDepositFractionOnDeposit.toString(),
      entryFee: entryFee.toString(),
      protocolFee: protocolFee.toString(),
      feeDenominator: feeDenominator.toString(),
    } as CreateTripleFeesType,
  } as CreateTripleLoaderData)
}
