import { useEffect } from 'react'

import { getRequest } from '@lib/services/request'
import { jsonToTable } from '@lib/utils/csv'
import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'

export async function loader({ params }: LoaderFunctionArgs) {
  const requestHash = params.requestHash

  if (!requestHash) {
    throw new Response(null, { status: 404 })
  }

  try {
    const request = await getRequest(requestHash)

    if (!request.data || !Array.isArray(request.data)) {
      throw new Response(null, { status: 404 })
    }

    // Convert the JSON data to table format (2D array)
    const tableData = jsonToTable(JSON.stringify(request.data))

    return { csvData: tableData }
  } catch (error) {
    throw new Response(null, { status: 404 })
  }
}

export default function RequestPage() {
  const { csvData } = useLoaderData<typeof loader>()
  const navigate = useNavigate()

  useEffect(() => {
    // Navigate to the main app with the CSV data
    navigate(`/app?csvData=${encodeURIComponent(JSON.stringify(csvData))}`, {
      replace: true,
    })
  }, [csvData, navigate])

  return null
}
