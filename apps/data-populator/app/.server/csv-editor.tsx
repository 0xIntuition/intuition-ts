import { getMyRequests, getRequest } from '@lib/services/request'
import { getMyAtoms, getMyTriples } from '@lib/services/supabase'
import { convertCsvToSchemaObjects } from '@lib/utils/schema'
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/node'
import { Thing, WithContext } from 'schema-dts'

import {
  checkAtomsExist,
  generateTagAtomsCallData,
  getAtomDataFromID,
  logTransactionHashAndVerifyTriples,
  Triple,
} from '../lib/services/populate'

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
      console.log('Getting atom history from csv-editor.tsx')
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
      console.log('Getting triple history from csv-editor.tsx')
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
      console.log('Getting atom data from csv-editor.tsx')
      const atomData = await getAtomDataFromID(atomID)
      return json({ result: { atomID, atomData } })
    }

    case 'getRequestUpdate': {
      const requestHash = url.searchParams.get('requestHash') as string
      console.log('Getting request update from csv-editor.tsx')
      const requestUpdate = await getRequest(requestHash)
      // console.log("requestUpdate response:",requestUpdate)
      return json({ result: requestUpdate })
    }

    case 'getMyRequests': {
      const limit = parseInt(url.searchParams.get('limit') || '100')
      const offset = parseInt(url.searchParams.get('offset') || '0')
      console.log('Getting my requests from csv-editor.tsx')
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
  console.log('Form data:', formData)
  const action = formData.get('action')

  switch (action) {
    // case 'publishAtoms': {
    //   // Handle publishing of selected atoms
    //   const selectedRows = JSON.parse(
    //     formData.get('selectedRows') as string,
    //   ) as number[]
    //   const csvData = JSON.parse(
    //     formData.get('csvData') as string,
    //   ) as string[][]
    //   const schemaObjects = convertCsvToSchemaObjects<Thing>(csvData)
    //   const selectedAtoms = selectedRows.map((index) => schemaObjects[index])
    //   const requestHash = await createPopulateAtomsRequest(selectedAtoms)
    //   console.log('Pinning atoms from csv-editor.tsx')
    //   const { newCIDs } = await pinAtoms(selectedAtoms, requestHash)
    //   const { chunks, chunkSize, calls } = await generateBatchAtomsCalldata(
    //     newCIDs,
    //     requestHash,
    //   )

    //   console.log('Publish atoms request hash:', requestHash)
    //   return json({
    //     success: true,
    //     requestHash,
    //     chunks,
    //     chunkSize,
    //     calls,
    //     action,
    //   })
    // }

    // case 'createAndTagAtoms': {
    //   // Handle creation and tagging of atoms
    //   const selectedRows = JSON.parse(
    //     formData.get('selectedRows') as string,
    //   ) as number[]
    //   const csvData = JSON.parse(
    //     formData.get('csvData') as string,
    //   ) as string[][]
    //   const tag = JSON.parse(
    //     formData.get('tag') as string,
    //   ) as WithContext<Thing>
    //   const schemaObjects = convertCsvToSchemaObjects<Thing>(csvData)
    //   const selectedAtoms = selectedRows.map((index) => schemaObjects[index])
    //   // console.log('Selected atoms:', selectedAtoms)
    //   // console.log('Tag:', tag)
    //   const publishAndTagAtomsRequestHash = await requestPopulateAndTagAtoms(
    //     selectedAtoms,
    //     tag,
    //   )
    //   console.log(
    //     'Publish and tag atoms request hash:',
    //     publishAndTagAtomsRequestHash,
    //   )
    //   return json({ success: true, requestHash: publishAndTagAtomsRequestHash })
    // }

    case 'llmInteraction':
      // TODO: Implement actual LLM interaction logic
      // const llmInput = formData.get('llmInput') as string
      // const llmResponse = await someExternalLLMService(llmInput)
      // return json({ success: true, llmResponse })
      return json({
        success: true,
        result: '[PLACEHOLDER] LLM Interaction Submitted',
      })

    case 'checkAtomsExist': {
      // Check if multiple atoms exist
      console.log('Checking atoms exist')
      const csvData = JSON.parse(
        formData.get('csvData') as string,
      ) as string[][]
      console.log('Checking atoms exist from csv-editor.tsx')
      const schemaObjects = convertCsvToSchemaObjects<Thing>(csvData)
      const atomExistsResults = await checkAtomsExist(schemaObjects)
      // console.log('Atom exists results:', atomExistsResults)
      return json({ success: true, atomExistsResults })
    }

    case 'checkAtomExists': {
      // Check if a single atom exists
      const csvData = JSON.parse(
        formData.get('csvData') as string,
      ) as string[][]
      console.log('Checking atom exists from csv-editor.tsx')
      const schemaObjects = convertCsvToSchemaObjects<Thing>(csvData)
      const index = parseInt(formData.get('index') as string)
      const atomExistsResults = await checkAtomsExist([schemaObjects[index]])
      return json({ success: true, atomExistsResults })
    }

    // case 'initiateTagRequest': {
    //   const selectedRows = JSON.parse(
    //     formData.get('selectedRows') as string,
    //   ) as number[]
    //   const selectedAtoms = JSON.parse(
    //     formData.get('selectedAtoms') as string,
    //   ) as WithContext<Thing>[]
    //   const tag = JSON.parse(
    //     formData.get('tag') as string,
    //   ) as WithContext<Thing>

    //   console.log('Initiating tag request from csv-editor.tsx')

    //   const requestHash = await createTagAtomsRequest(
    //     selectedAtoms,
    //     tag,
    //     request,
    //   )

    //   return json({
    //     success: true,
    //     requestHash,
    //     selectedRows,
    //     selectedAtoms,
    //     tag,
    //   })
    // }

    case 'publishTriples': {
      const requestHash = formData.get('requestHash') as string
      const selectedAtoms = JSON.parse(
        formData.get('selectedAtoms') as string,
      ) as WithContext<Thing>[]
      const tag = JSON.parse(
        formData.get('tag') as string,
      ) as WithContext<Thing>

      console.log('Publishing triples from csv-editor.tsx')

      const { calls, chunks, chunkSize, filteredTriples, existingTriples } =
        await generateTagAtomsCallData(selectedAtoms, tag, requestHash)

      return json({
        success: true,
        calls,
        chunks,
        chunkSize,
        filteredTriples,
        existingTriples,
      })
    }

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
