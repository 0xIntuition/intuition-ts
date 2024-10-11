import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/node'
import { db } from './db'
import { convertCsvToSchemaObjects } from '../utils/schema'
import { requestPopulateAtoms, checkAtomsExist, requestPopulateAndTagAtoms, getAtomDataFromID } from '../lib/services/populate'
import { Thing, WithContext } from 'schema-dts'
import { getMyAtoms, getMyTriples } from '../lib/services/supabase'
import { getMyRequests, getRequest } from '../lib/services/request'

// TODO: Implement real functions for CSV editor operations
// Ensure proper input and return type declarations for better understanding

// Loader function to handle GET requests
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const action = url.searchParams.get('action')

  switch (action) {
    case 'getAtomHistory':
      const atomPage = parseInt(url.searchParams.get('page') || '0')
      const atomPageSize = parseInt(url.searchParams.get('pageSize') || '10')
      const atoms = await getMyAtoms(atomPageSize, atomPage * atomPageSize)
      return json({ atoms })

    case 'getTripleHistory':
      const triplePage = parseInt(url.searchParams.get('page') || '0')
      const triplePageSize = parseInt(url.searchParams.get('pageSize') || '10')
      const triples = await getMyTriples(triplePageSize, triplePage * triplePageSize)
      return json({ triples })

    case 'searchAtoms':
      // TODO: Implement actual search logic
      // const query = url.searchParams.get('query')
      // const searchResults = await db.atoms.findMany({
      //   where: {
      //     OR: [{ name: { contains: query } }, { description: { contains: query } }],
      //   },
      // })
      return json({ success: true, result: '[PLACEHOLDER] Search Results' })

    case 'getAtomData':
      const atomID = url.searchParams.get('atomID') as string
      const atomData = await getAtomDataFromID(atomID)
      return json({ result: { atomID, atomData } })

    case 'getRequestUpdate':
      const requestHash = url.searchParams.get('requestHash') as string
      const requestUpdate = await getRequest(requestHash)
      // console.log("requestUpdate response:",requestUpdate)
      return json({ result: requestUpdate })

    case 'getMyRequests':
      const limit = parseInt(url.searchParams.get('limit') || '100')
      const offset = parseInt(url.searchParams.get('offset') || '0')
      const myRequests = await getMyRequests(limit, offset)
      return json({ result: myRequests })

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
    case 'publishAtoms': {
      // Handle publishing of selected atoms
      const selectedRows = JSON.parse(formData.get('selectedRows') as string) as number[]
      const csvData = JSON.parse(formData.get('csvData') as string) as string[][]
      const schemaObjects = convertCsvToSchemaObjects<Thing>(csvData)
      const selectedAtoms = selectedRows.map((index) => schemaObjects[index])
      // console.log('Selected atoms:', selectedAtoms)
      const publishAtomsRequestHash = await requestPopulateAtoms(selectedAtoms)
      console.log('Publish atoms request hash:', publishAtomsRequestHash)
      return json({ success: true, requestHash: publishAtomsRequestHash })
    }

    case 'createAndTagAtoms': {
      // Handle creation and tagging of atoms
      const selectedRows = JSON.parse(formData.get('selectedRows') as string) as number[]
      const csvData = JSON.parse(formData.get('csvData') as string) as string[][]
      const tag = JSON.parse(formData.get('tag') as string) as WithContext<Thing>
      const schemaObjects = convertCsvToSchemaObjects<Thing>(csvData)
      const selectedAtoms = selectedRows.map((index) => schemaObjects[index])
      // console.log('Selected atoms:', selectedAtoms)
      // console.log('Tag:', tag)
      const publishAndTagAtomsRequestHash = await requestPopulateAndTagAtoms(selectedAtoms, tag)
      console.log('Publish and tag atoms request hash:', publishAndTagAtomsRequestHash)
      return json({ success: true, requestHash: publishAndTagAtomsRequestHash })
    }

    case 'llmInteraction':
      // TODO: Implement actual LLM interaction logic
      // const llmInput = formData.get('llmInput') as string
      // const llmResponse = await someExternalLLMService(llmInput)
      // return json({ success: true, llmResponse })
      return json({ success: true, result: '[PLACEHOLDER] LLM Interaction Submitted' })

    case 'checkAtomsExist': {
      // Check if multiple atoms exist
      console.log('Checking atoms exist')
      const csvData = JSON.parse(formData.get('csvData') as string) as string[][]
      const schemaObjects = convertCsvToSchemaObjects<Thing>(csvData)
      const atomExistsResults = await checkAtomsExist(schemaObjects)
      // console.log('Atom exists results:', atomExistsResults)
      return json({ success: true, atomExistsResults })
    }

    case 'checkAtomExists': {
      // Check if a single atom exists
      const csvData = JSON.parse(formData.get('csvData') as string) as string[][]
      const schemaObjects = convertCsvToSchemaObjects<Thing>(csvData)
      const index = parseInt(formData.get('index') as string)
      const atomExistsResults = await checkAtomsExist([schemaObjects[index]])
      return json({ success: true, atomExistsResults })
    }

    default:
      return json({ error: 'Invalid action' }, { status: 400 })
  }
}