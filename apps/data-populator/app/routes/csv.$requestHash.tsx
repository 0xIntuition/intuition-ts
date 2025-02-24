import { getRequest } from '@lib/services/request'
import { generateCsvContent, jsonToTable } from '@lib/utils/csv'
import { LoaderFunctionArgs } from '@remix-run/node'

export async function loader({ params }: LoaderFunctionArgs) {
  const requestHash = params.requestHash

  if (!requestHash) {
    throw new Error('No route matches URL "/csv/"')
  }

  try {
    const request = await getRequest(requestHash)

    if (!request.data || !Array.isArray(request.data)) {
      throw new Error(`No route matches URL "/csv/${requestHash}"`)
    }

    // Convert the JSON data to CSV using the same functions as the UI
    const tableData = jsonToTable(JSON.stringify(request.data))
    const csvContent = generateCsvContent(tableData)

    // Return the CSV file with appropriate headers
    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv;charset=utf-8',
        'Content-Disposition': `attachment; filename="${requestHash}.csv"`,
      },
    })
  } catch (error) {
    throw new Error(`No route matches URL "/csv/${requestHash}"`)
  }
}
