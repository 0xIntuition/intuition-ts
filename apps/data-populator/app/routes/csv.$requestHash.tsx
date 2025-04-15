import { getRequest } from '@lib/services/request'
import { generateCsvContent, jsonToTable } from '@lib/utils/csv'
import { type LoaderFunctionArgs } from '@remix-run/node'

export async function loader({ params }: LoaderFunctionArgs) {
  const { requestHash } = params
  if (!requestHash) {
    throw new Response('Not Found', { status: 404 })
  }

  const request = await getRequest(requestHash)
  if (!request || !Array.isArray(request.data)) {
    throw new Response('Not Found', { status: 404 })
  }

  const table = jsonToTable(JSON.stringify(request.data))
  const csvContent = generateCsvContent(table)

  return new Response(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="data-${requestHash}.csv"`,
    },
  })
}
