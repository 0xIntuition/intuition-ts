import { getMyRequests, getRequest } from '@lib/services/request'
import { getMyAtoms, getMyTriples } from '@lib/services/supabase'
import { convertCsvToSchemaObjects } from '@lib/utils/schema'
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/node'
import { Thing } from 'schema-dts'

import {
  checkAtomsExist,
  checkAtomsExistWithRawURIs,
  getAtomDataFromID,
  logTransactionHashAndVerifyTriples,
  Triple,
} from '../lib/services/populate'
import { AtomDataTypeKey } from '../lib/utils/atom-data-types'

// TODO: Implement real functions for CSV editor operations
// Ensure proper input and return type declarations for better understanding

// Loader function to handle GET requests
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const action = url.searchParams.get('action')

  switch (action) {
    case 'getAtomHistory': {
      const atomPage = parseInt(url.searchParams.get('page') || '0')
      const atomPageSize = parseInt(url.searchParams.get('pageSize') || '10')
      // console.log('Getting atom history from csv-editor.tsx')
      const atoms = await getMyAtoms(
        request,
        atomPageSize,
        atomPage * atomPageSize,
      )
      return json({ atoms })
    }

    case 'getTripleHistory': {
      const triplePage = parseInt(url.searchParams.get('page') || '0')
      const triplePageSize = parseInt(url.searchParams.get('pageSize') || '10')
      // console.log('Getting triple history from csv-editor.tsx')
      const triples = await getMyTriples(
        request,
        triplePageSize,
        triplePage * triplePageSize,
      )
      return json({ triples })
    }

    case 'searchAtoms':
      // TODO: Implement actual search logic
      // const query = url.searchParams.get('query')
      // const searchResults = await db.atoms.findMany({
      //   where: {
      //     OR: [{ name: { contains: query } }, { description: { contains: query } }],
      //   },
      // })
      return json({ success: true, result: '[PLACEHOLDER] Search Results' })

    case 'getAtomData': {
      const atomID = url.searchParams.get('atomID') as string
      // console.log('Getting atom data from csv-editor.tsx')
      const atomData = await getAtomDataFromID(atomID)
      return json({ result: { atomID, atomData } })
    }

    case 'getRequestUpdate': {
      const requestHash = url.searchParams.get('requestHash') as string
      // console.log('Getting request update from csv-editor.tsx')
      const requestUpdate = await getRequest(requestHash)
      // console.log("requestUpdate response:",requestUpdate)
      return json({ result: requestUpdate })
    }

    case 'getMyRequests': {
      const limit = parseInt(url.searchParams.get('limit') || '100')
      const offset = parseInt(url.searchParams.get('offset') || '0')
      // console.log('Getting my requests from csv-editor.tsx')
      const myRequests = await getMyRequests(request, limit, offset)
      return json({ result: myRequests })
    }

    default:
      return json({ error: 'Invalid action' }, { status: 400 })
  }
}

// Action function to handle POST requests
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const action = formData.get('action')

  switch (action) {
    case 'checkAtomsExist': {
      // Check if multiple atoms exist
      console.log('Checking atoms exist')
      const csvData = JSON.parse(
        formData.get('csvData') as string,
      ) as string[][]
      const selectedType = formData.get('selectedType') as AtomDataTypeKey

      if (selectedType === 'CSV') {
        const schemaObjects = convertCsvToSchemaObjects<Thing>(csvData)
        const atomExistsResults = await checkAtomsExist(schemaObjects)
        return json({ success: true, atomExistsResults })
      }
      // For URI and CAIP10 types, extract the URIs from the data
      // Skip header row and extract URIs
      const URIs = csvData.slice(1).map((row) => row[0]) // First column contains the URI/CAIP10
      const atomExistsResults = await checkAtomsExistWithRawURIs(URIs)
      return json({ success: true, atomExistsResults })
    }

    case 'checkAtomExists': {
      // Check if a single atom exists
      const csvData = JSON.parse(
        formData.get('csvData') as string,
      ) as string[][]
      const selectedType = formData.get('selectedType') as AtomDataTypeKey
      const index = parseInt(formData.get('index') as string)

      if (selectedType === 'CSV') {
        const schemaObjects = convertCsvToSchemaObjects<Thing>(csvData)
        const atomExistsResults = await checkAtomsExist([schemaObjects[index]])
        return json({ success: true, atomExistsResults })
      }
      const URI = csvData[index + 1][0] // +1 to skip header row, [0] for first column
      const atomExistsResults = await checkAtomsExistWithRawURIs([URI])
      return json({ success: true, atomExistsResults })
    }

    // case 'publishTriples': {
    //   // Does this ever get called?
    //   console.log(
    //     'PUBLISH TRIPLES CALLED IN CSV-EDITOR WHEN IT EXISTS IN INDEX.TSX',
    //   )
    //   const requestHash = formData.get('requestHash') as string
    //   const selectedAtoms = JSON.parse(
    //     formData.get('selectedAtoms') as string,
    //   ) as WithContext<Thing>[]
    //   const tag = JSON.parse(
    //     formData.get('tag') as string,
    //   ) as WithContext<Thing>

    //   console.log('Publishing triples from csv-editor.tsx')

    //   const { calls, chunks, chunkSize, filteredTriples, existingTriples } =
    //     await generateTagAtomsCallData(selectedAtoms, tag, false, requestHash)

    //   return json({
    //     success: true,
    //     calls,
    //     chunks,
    //     chunkSize,
    //     filteredTriples,
    //     existingTriples,
    //   })
    // }

    case 'logTxHashAndVerifyTriples': {
      const txHash = formData.get('txHash') as string
      const requestHash = formData.get('requestHash') as string
      const newTriples = JSON.parse(
        formData.get('newTriples') as string,
      ) as Triple[]
      const existingTriples = JSON.parse(
        formData.get('existingTriples') as string,
      ) as Triple[]

      console.log('Logging tx hash and verifying triples from csv-editor.tsx')

      const result = await logTransactionHashAndVerifyTriples(
        txHash,
        newTriples,
        existingTriples,
        requestHash,
        request,
      )

      return json({ success: true, ...result })
    }

    default:
      return json({ error: 'Invalid action' }, { status: 400 })
  }
}
