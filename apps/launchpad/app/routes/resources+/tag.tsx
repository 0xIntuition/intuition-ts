import logger from '@lib/utils/logger'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { getTripleHashFromAtoms, getTriplesByHash } from '@server/multivault'

export type TagLoaderData = {
  result: string
  subjectId: string
  objectId: string
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

    const getTripleHashFromAtomsHash = await getTripleHashFromAtoms({
      subjectId: BigInt(subjectId),
      predicateId: BigInt(predicateId),
      objectId: BigInt(objectId),
    })

    logger('Hash from atoms:', getTripleHashFromAtomsHash)

    const getTriplesByHashResult = await getTriplesByHash({
      hash: getTripleHashFromAtomsHash,
    })

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
