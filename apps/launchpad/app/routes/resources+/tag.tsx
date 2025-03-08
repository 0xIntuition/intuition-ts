import logger from '@lib/utils/logger'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { getMultivaultContract, publicClient } from '@server/viem'

export type TagLoaderData = {
  result: string
  subjectId: string
  objectId: string
}

interface MulticallResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result?: any
  error?: Error
  status: 'failure' | 'success'
}

export async function loader({ request }: LoaderFunctionArgs) {
  logger('request', request)
  const url = new URL(request.url)
  const subjectId = url.searchParams.get('subjectId')
  const predicateId = url.searchParams.get('predicateId')
  const objectId = url.searchParams.get('objectId')

  if (!subjectId || !predicateId || !objectId) {
    return json({ error: 'Missing parameters' }, { status: 400 })
  }

  try {
    logger('Input values:', { subjectId, predicateId, objectId })

    const subjectIdBigInt = BigInt(subjectId)
    const predicateIdBigInt = BigInt(predicateId)
    const objectIdBigInt = BigInt(objectId)

    const coreContractConfigs = [
      {
        ...getMultivaultContract,
        functionName: 'tripleHashFromAtoms',
        args: [subjectIdBigInt, predicateIdBigInt, objectIdBigInt],
      },
    ]

    const resp: MulticallResponse[] = await publicClient.multicall({
      contracts: coreContractConfigs,
    })

    const getTripleHashFromAtomsHash = resp[0].result as `0x${string}`

    logger('Hash from atoms:', getTripleHashFromAtomsHash)

    // Add the second call to the multicall
    const secondCallConfigs = [
      {
        ...getMultivaultContract,
        functionName: 'triplesByHash',
        args: [getTripleHashFromAtomsHash],
      },
    ]

    const secondResp: MulticallResponse[] = await publicClient.multicall({
      contracts: secondCallConfigs,
    })

    const getTriplesByHashResult = secondResp[0].result as bigint

    logger('Result for actual hash:', getTriplesByHashResult.toString())

    return json({
      result: getTriplesByHashResult.toString(),
      subjectId,
      objectId,
    })
  } catch (error) {
    console.error('Error fetching triple hash:', error)
    return json({ error: 'Error fetching triple hash' }, { status: 500 })
  }
}
