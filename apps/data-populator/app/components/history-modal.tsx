/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@0xintuition/1ui'

import { generateCsvContent, jsonToTable } from '@lib/utils/csv'
import { loadThumbnail } from '@lib/utils/image'
import { useFetcher } from '@remix-run/react'

interface HistoryModalProps {
  isOpen: boolean
  onClose: () => void
}

// Interfaces for log entries
interface AtomLogEntry {
  id: string
  cid: string
  txHash?: string | null | undefined
  data?: any
}

interface TripleLogEntry {
  id: string
  txHash: string | null | undefined
  subjectId: string
  predicateId: string
  objectId: string
}

type JsonifyObject<T> = {
  [P in keyof T]: T[P] extends object ? JsonifyObject<T[P]> : T[P]
}

// Function to get the appropriate block explorer URL
const getBlockExplorerUrl = (isDev: boolean = true) => {
  return isDev ? 'https://sepolia.basescan.org/tx/' : 'https://basescan.org/tx/'
}

// Function to format CID as a truncated link
const formatCID = (cid: string) => {
  if (cid.startsWith('ipfs://')) {
    const ipfsHash = cid.slice(7) // Remove 'ipfs://' prefix
    const truncatedCID = `ipfs://...${ipfsHash.slice(-5)}`
    const fullLink = `https://ipfs.io/ipfs/${ipfsHash}`
    return (
      <a
        href={fullLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {truncatedCID}
      </a>
    )
  }
  return cid
}

// Function to format TX Hash as a truncated link or display "Unknown"
const formatTxHash = (
  txHash: string | null | undefined,
  isDev: boolean = true,
) => {
  if (!txHash) {
    return <span className="text-gray-400">Unknown</span>
  }
  const truncatedTxHash = `${txHash.slice(0, 6)}...${txHash.slice(-4)}`
  const fullLink = `${getBlockExplorerUrl(isDev)}${txHash}`
  return (
    <a
      href={fullLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline"
    >
      {truncatedTxHash}
    </a>
  )
}

// Function to extract common fields from data objects
const extractCommonFields = (atoms: JsonifyObject<AtomLogEntry>[]) => {
  const fields = new Set<string>()
  atoms.forEach((atom) => {
    if (
      atom.data &&
      typeof atom.data === 'object' &&
      atom.data['@context'] === 'https://schema.org'
    ) {
      Object.keys(atom.data).forEach((key) => {
        if (key !== '@context') {
          fields.add(`data:${key}`)
        }
      })
    }
  })
  return Array.from(fields)
}

// New helper function to format URLs
const formatUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url)
    let displayText = parsedUrl.hostname + parsedUrl.pathname
    displayText = displayText.replace(/^www\./i, '') // Remove 'www.' if present
    displayText = displayText.replace(/\/$/, '') // Remove trailing slash
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {displayText}
      </a>
    )
  } catch {
    // If URL is invalid, return it as is
    return url
  }
}

// Custom cell renderer
const renderCell = (atom: JsonifyObject<AtomLogEntry>, key: string) => {
  if (key.startsWith('data:')) {
    const dataKey = key.split(':')[1]
    const value = atom.data && atom.data[dataKey]
    if (typeof value === 'object') {
      return JSON.stringify(value)
    }
    if (dataKey === 'image' && typeof value === 'string') {
      return <ImageThumbnail url={value} />
    }
    if (dataKey === 'url' && typeof value === 'string') {
      return formatUrl(value)
    }
    return value || ''
  }
  switch (key) {
    case 'id':
      return atom.id
    case 'cid':
      return formatCID(atom.cid)
    case 'txHash':
      return formatTxHash(atom.txHash)
    default:
      return ''
  }
}

// New component for image thumbnails
const ImageThumbnail: React.FC<{ url: string }> = ({ url }) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null)

  useEffect(() => {
    loadThumbnail(url, 200).then(setThumbnail) // Increased size to 200px
  }, [url])

  if (!thumbnail) {
    return <span>Loading...</span>
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <img
        src={thumbnail}
        alt="Thumbnail"
        className="w-auto h-full object-cover max-h-24"
      />
    </a>
  )
}

interface TripleTableAtomData {
  atomID: string
  atomData: {
    [key: string]: any
  }
}

// Add this new component for the tooltip content
const AtomTooltip: React.FC<{ atomData: any }> = ({ atomData }) => {
  return (
    <div className="text-sm">
      {Object.entries(atomData).map(([key, value]) => (
        <div key={key} className="mb-1">
          <strong>{key}:</strong>{' '}
          {key === 'image' && typeof value === 'string' ? (
            <ImageThumbnail url={value} />
          ) : key === 'url' && typeof value === 'string' ? (
            formatUrl(value)
          ) : key === 'cid' && typeof value === 'string' ? (
            formatCID(value)
          ) : key === 'txHash' &&
            (typeof value === 'string' ||
              value === null ||
              value === undefined) ? (
            formatTxHash(value)
          ) : typeof value === 'object' ? (
            JSON.stringify(value)
          ) : (
            String(value)
          )}
        </div>
      ))}
    </div>
  )
}

// Update the RequestData interface
interface RequestData {
  hash: string
  status: 'pending' | 'processing' | 'fulfilled' | 'failed'
  type: 'createAtoms' | 'createTriples'
  created_at: string
  data: any[] // Add this line
}

export function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  const [atomPage, setAtomPage] = useState(0)
  const [triplePage, setTriplePage] = useState(0)
  const [requestPage, setRequestPage] = useState(0)
  const pageSize = 10

  const atomFetcher = useFetcher<{ atoms: AtomLogEntry[] }>()
  const tripleFetcher = useFetcher<{ triples: TripleLogEntry[] }>()
  const requestFetcher = useFetcher<{ result: RequestData[] }>()
  const atomDataFetcher = useFetcher<{ result: TripleTableAtomData }>()

  const [atomData, setAtomData] = useState<Record<string, TripleTableAtomData>>(
    {},
  )

  useEffect(() => {
    if (isOpen) {
      atomFetcher.load(
        `/api/csv-editor?action=getAtomHistory&page=${atomPage}&pageSize=${pageSize}`,
      )
      tripleFetcher.load(
        `/api/csv-editor?action=getTripleHistory&page=${triplePage}&pageSize=${pageSize}`,
      )
      requestFetcher.load(
        `/api/csv-editor?action=getMyRequests&offset=${requestPage * pageSize}&limit=${pageSize}`,
      )
    }
  }, [isOpen, atomPage, triplePage, requestPage])

  useEffect(() => {
    if (tripleFetcher.data?.triples) {
      const atomIds = new Set<string>()
      tripleFetcher.data.triples.forEach((triple) => {
        atomIds.add(triple.subjectId)
        atomIds.add(triple.predicateId)
        atomIds.add(triple.objectId)
      })

      atomIds.forEach((id) => {
        if (!atomData[id]) {
          atomDataFetcher.load(
            `/api/csv-editor?action=getAtomData&atomID=${id}`,
          )
        }
      })
    }
  }, [tripleFetcher.data, atomData])

  useEffect(() => {
    if (atomDataFetcher.data?.result) {
      const { atomID, atomData: fetchedAtomData } = atomDataFetcher.data.result
      setAtomData((prev) => ({
        ...prev,
        [atomID]: {
          atomID,
          atomData:
            typeof fetchedAtomData === 'string'
              ? JSON.parse(fetchedAtomData)
              : fetchedAtomData,
        },
      }))
    }
  }, [atomDataFetcher.data])

  // Update the getAtomName function to return both name and full data
  const getAtomData = useCallback(
    (atomId: string) => {
      const atomDataObj = atomData[atomId]
      let name = atomId
      let fullData = {}

      if (atomDataObj && atomDataObj.atomData) {
        fullData = atomDataObj.atomData
        name = atomDataObj.atomData.name || atomId

        // Special case for schema.org URIs
        if (name.startsWith('https://schema.org/')) {
          const schemaOrgName = name.split('/').pop() || name
          name = `schema://${schemaOrgName}`
        }
      }

      return { name: `${atomId} (${name})`, fullData }
    },
    [atomData],
  )

  const atoms = atomFetcher.data?.atoms || []
  const triples = tripleFetcher.data?.triples || []
  const requests = requestFetcher.data?.result || []

  const atomColumns = useMemo(() => {
    const baseColumns = ['id', 'cid', 'txHash']
    const dataColumns = extractCommonFields(atoms)
    return [...baseColumns, ...dataColumns]
  }, [atoms])

  const handleSaveCsv = useCallback((data: any[]) => {
    const tableData = jsonToTable(JSON.stringify(data))
    const csvContent = generateCsvContent(tableData)
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'request_data.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>History</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Atoms</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {atomColumns.map((column) => (
                    <TableHead key={column}>{column}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {atoms.map((atom) => (
                  <TableRow key={atom.id} className="h-24">
                    {atomColumns.map((column) => (
                      <TableCell
                        key={`${atom.id}-${column}`}
                        className="h-full"
                      >
                        {renderCell(atom, column)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between">
            <Button
              onClick={() => setAtomPage(Math.max(0, atomPage - 1))}
              disabled={atomPage === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => setAtomPage(atomPage + 1)}
              disabled={atoms.length < pageSize}
            >
              Next
            </Button>
          </div>

          <h3 className="text-lg font-semibold mt-8">Triples</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Predicate</TableHead>
                <TableHead>Object</TableHead>
                <TableHead>TX Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {triples.map((triple) => (
                <TableRow key={triple.id}>
                  <TableCell>{triple.id}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="w-full text-left">
                          {getAtomData(triple.subjectId).name}
                        </TooltipTrigger>
                        <TooltipContent>
                          <AtomTooltip
                            atomData={getAtomData(triple.subjectId).fullData}
                          />
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="w-full text-left">
                          {getAtomData(triple.predicateId).name}
                        </TooltipTrigger>
                        <TooltipContent>
                          <AtomTooltip
                            atomData={getAtomData(triple.predicateId).fullData}
                          />
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="w-full text-left">
                          {getAtomData(triple.objectId).name}
                        </TooltipTrigger>
                        <TooltipContent>
                          <AtomTooltip
                            atomData={getAtomData(triple.objectId).fullData}
                          />
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>{formatTxHash(triple.txHash)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between">
            <Button
              onClick={() => setTriplePage(Math.max(0, triplePage - 1))}
              disabled={triplePage === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => setTriplePage(triplePage + 1)}
              disabled={triples.length < pageSize}
            >
              Next
            </Button>
          </div>

          <h3 className="text-lg font-semibold mt-8">Requests</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hash</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>CSV</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.hash}>
                  <TableCell>{request.hash}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>
                    {new Date(request.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {request.data && Array.isArray(request.data) ? (
                      <div className="flex items-center space-x-2">
                        <span>{request.data.length} items</span>
                        <Button
                          onClick={() => handleSaveCsv(request.data)}
                          size="sm"
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      'No data'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between">
            <Button
              onClick={() => setRequestPage(Math.max(0, requestPage - 1))}
              disabled={requestPage === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => setRequestPage(requestPage + 1)}
              disabled={requests.length < pageSize}
            >
              Next
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
