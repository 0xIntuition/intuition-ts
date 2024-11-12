import { useCallback, useEffect, useRef, useState } from 'react'

import {
  Button,
  ButtonVariant,
  Checkbox,
  cn,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  Textarea,
  TextVariant,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@0xintuition/1ui'

import { useBatchCreateAtom } from '@client/useBatchCreateAtom'
import { useBatchCreateTriple } from '@client/useBatchCreateTriple'
import CsvUploader from '@components/csv-uploader'
import { ProgressModal } from '@components/progress-modal'
import { ProofreadModal } from '@components/proofread-modal'
import { Progress } from '@components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import {
  BatchAtomsRequest,
  checkAndFilterURIs,
  createPopulateAtomsRequest,
  createTagAtomsRequest,
  generateBatchAtomsCalldata,
  generateTagAtomsCallData,
  logTransactionHashAndVerifyAtoms,
  logTransactionHashAndVerifyTriples,
  pinAtoms,
  PinDataResult,
  URIExistsResult,
} from '@lib/services/populate'
import {
  atomDataTypes,
  detectAtomDataType,
  type AtomDataTypeKey,
} from '@lib/utils/atom-data-types'
import { generateCsvContent, parseCsv } from '@lib/utils/csv'
import { loadThumbnail, loadThumbnails } from '@lib/utils/image'
import logger from '@lib/utils/logger'
import {
  detectAdjacentDuplicatesForCell,
  detectAllAdjacentDuplicates,
  proofreadAll,
  proofreadRow,
  type CellHighlight,
  type UnusualCharacterIssue,
} from '@lib/utils/proofread'
import { convertCsvToSchemaObjects } from '@lib/utils/schema'
import type { SortDirection } from '@lib/utils/sort'
import { getNextSortDirection, sortData } from '@lib/utils/sort'
import { getTooltip, TooltipKey } from '@lib/utils/tooltips'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { useActionData, useNavigation } from '@remix-run/react'
import {
  BookCheck,
  CirclePlus,
  Download,
  File,
  FileSpreadsheet,
  BookCheck,
  FileType,
  Loader2,
  Minus,
  Plus,
  Save,
  Send,
  Shapes,
  Tag,
  Trash,
  Upload,
  TagIcon,
} from 'lucide-react'
import { Thing, WithContext } from 'schema-dts'

// Add this new interface
interface AtomExistsResult {
  cid: string
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  filteredObj: any
  alreadyExists: boolean
  originalIndex: number
}

// Update the ActionData type to be more specific
export type ActionData =
  | InitiateActionData
  | PublishActionData
  | LogTxActionData
  | { success: true }
  | ErrorActionData

export type InitiateActionData = {
  success: boolean
  requestHash: string
  selectedRows: number[]
  selectedAtoms: WithContext<Thing>[]
  csvData: string[][]
}

export type PublishActionData = {
  success: boolean
  calls: BatchAtomsRequest[]
  chunks: string[][]
  chunkSize: number
  existingCIDs: string[]
  newCIDs: string[]
  filteredData: PinDataResult[]
  existingData: PinDataResult[]
}

export type LogTxActionData = {
  success: boolean
  error: ErrorActionData
}

export type ErrorActionData = {
  error: string
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData()
    const action = formData.get('action')

    switch (action) {
      case 'initiateBatchAtomRequest': {
        const selectedRows = JSON.parse(
          formData.get('selectedRows') as string,
        ) as number[]
        const csvData = JSON.parse(
          formData.get('csvData') as string,
        ) as string[][]
        const selectedType = formData.get('selectedType') as AtomDataTypeKey
        const schemaObjects = convertCsvToSchemaObjects<Thing>(csvData)
        const selectedAtoms = selectedRows.map((index) => schemaObjects[index])
        const requestHash = await createPopulateAtomsRequest(
          selectedAtoms,
          request,
        )
        logger(`Initiated batch atom request with hash: ${requestHash}`)
        logger(`Selected rows: ${selectedRows}`)
        return json({
          success: true,
          requestHash,
          selectedRows,
          selectedAtoms,
          csvData,
          selectedType,
        })
      }

      case 'initiateBatchTripleRequest': {
        const selectedRows = JSON.parse(
          formData.get('selectedRows') as string,
        ) as number[]
        const selectedAtoms = JSON.parse(
          formData.get('selectedAtoms') as string,
        ) as WithContext<Thing>[]
        const tag = JSON.parse(
          formData.get('tag') as string,
        ) as WithContext<Thing>

        const requestHash = await createTagAtomsRequest(
          selectedAtoms,
          tag,
          request,
        )
        logger(`Initiated batch triple request with hash: ${requestHash}`)
        logger(`Selected rows: ${selectedRows}`)
        return json({
          success: true,
          requestHash,
          selectedRows,
          selectedAtoms,
          tag,
        })
      }

      case 'publishAtoms': {
        const requestHash = formData.get('requestHash') as string
        const selectedType = formData.get('selectedType') as AtomDataTypeKey

        console.log('selectedType:', selectedType)

        if (selectedType === 'CSV') {
          const selectedAtoms = JSON.parse(
            formData.get('selectedAtoms') as string,
          ) as WithContext<Thing>[]
          const { existingCIDs, newCIDs, filteredData, existingData } =
            await pinAtoms(selectedAtoms, requestHash)

          const { chunks, chunkSize, calls } = await generateBatchAtomsCalldata(
            newCIDs,
            requestHash,
          )
          return json({
            success: true,
            calls,
            chunks,
            chunkSize,
            newCIDs,
            existingCIDs,
            filteredData,
            existingData,
          })
        }

        // Raw URI case:
        const formDataString = formData.get('selectedAtoms') as string
        // URI and CAIP10 are objects which just have a single string, URI or CAIP10
        const intermediaryObjects = JSON.parse(formDataString) as Array<{
          URI?: string
          CAIP10?: string
        }>
        const URIs = intermediaryObjects.map((obj) => obj.URI || obj.CAIP10!)
        const { existingURIs, newURIs } = await checkAndFilterURIs(
          URIs,
          requestHash,
        )
        const { chunks, chunkSize, calls } = await generateBatchAtomsCalldata(
          newURIs,
          requestHash,
        )
        return json({
          success: true,
          calls,
          chunks,
          chunkSize,
          newURIs,
          existingURIs,
        })
      }

      case 'publishTriples': {
        const requestHash = formData.get('requestHash') as string
        const selectedAtoms = JSON.parse(
          formData.get('selectedAtoms') as string,
        ) as WithContext<Thing>[]
        const tag = JSON.parse(
          formData.get('tag') as string,
        ) as WithContext<Thing>
        const { calls, chunks, chunkSize } = await generateTagAtomsCallData(
          selectedAtoms,
          tag,
          requestHash,
        )
        return json({
          success: true,
          calls,
          chunks,
          chunkSize,
        })
      }

      case 'logTxHashAndVerifyAtoms': {
        const txHash = formData.get('txHash') as string
        const requestHash = formData.get('requestHash') as string
        const filteredCIDs = JSON.parse(formData.get('filteredCIDs') as string)
        const filteredData = JSON.parse(formData.get('filteredData') as string)
        const oldAtomCIDs = JSON.parse(formData.get('oldAtomCIDs') as string)
        const { newAtomIDs, existingAtomIDs } =
          await logTransactionHashAndVerifyAtoms(
            txHash,
            filteredCIDs,
            filteredData,
            oldAtomCIDs,
            requestHash,
            request,
          )
        return json({ success: true, newAtomIDs, existingAtomIDs })
      }

      case 'logTxHashAndVerifyTriples': {
        const txHash = formData.get('txHash') as string
        const requestHash = formData.get('requestHash') as string
        const newTriples = JSON.parse(formData.get('newTriples') as string)
        const existingTriples = JSON.parse(
          formData.get('existingTriples') as string,
        )
        const { newTripleIds, existingTripleIds } =
          await logTransactionHashAndVerifyTriples(
            txHash,
            newTriples,
            existingTriples,
            requestHash,
            request,
          )
        return json({ success: true, newTripleIds, existingTripleIds })
      }

      default:
        return json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Action error:', error)
    return json({ error: 'An error occurred' })
  }
}

// Update useCSVData to use deep copy
const useCSVData = (selectedType: AtomDataTypeKey) => {
  const [csvData, setCsvData] = useState<string[][]>(() =>
    JSON.parse(JSON.stringify(atomDataTypes[selectedType].defaultData)),
  )
  return [csvData, setCsvData] as const
}

// Add this type for the dialog state
type FormatChangeDialog = {
  isOpen: boolean
  newFormat: AtomDataTypeKey | null
  onResponse?: (response: 'yes' | 'no' | 'cancel') => void
}

// Add this type and constant before the CSVEditor component
type ViewTab = 'select' | 'upload' | 'publish' | 'tag'

const tabs = [
  { id: 'select', label: 'Select Type', icon: Shapes, cta: 'Select Type' },
  { id: 'upload', label: 'Upload', icon: Upload, cta: 'Select Files' },
  { id: 'publish', label: 'Publish', icon: Send, cta: 'Go Live' },
  { id: 'tag', label: 'Tag', icon: Tag, cta: 'Add Tags' },
]

export default function CSVEditor() {
  const [file, setFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState<ViewTab>('select')
  const [selectedType, setSelectedType] = useState<AtomDataTypeKey>('CSV')

  // State variables for managing CSV data, UI interactions, and atom-related operations

  const actionData = useActionData<ActionData>()
  const navigation = useNavigation()

  // Ensure we always have a deep copy of the CSV data
  const [csvData, setCsvData] = useCSVData(selectedType)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  // const [tags, setTags] = useState<string[][]>([])
  const [newTag, setNewTag] = useState<Record<string, string>>({
    '@context': 'https://schema.org',
    '@type': 'Thing',
    name: '',
    description: '',
    image: '',
    url: '',
  })
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalCallback, setModalCallback] = useState<
    (confirm: boolean) => void
  >(() => {})
  const [thumbnails, setThumbnails] = useState<Record<number, string>>({})
  const [existingAtoms, setExistingAtoms] = useState<Set<number>>(new Set())
  const [loadingRows, setLoadingRows] = useState<Set<number>>(new Set())
  const [isTagging, setIsTagging] = useState(false)
  const [sortState, setSortState] = useState<{
    column: number
    direction: SortDirection | null
  }>({
    column: -1,
    direction: null,
  })
  const [sortedIndices, setSortedIndices] = useState<number[]>([])
  const [cellHighlights, setCellHighlights] = useState<CellHighlight[]>([])
  const [, setShowProgressModal] = useState(false)
  const [proofreadIssues, setProofreadIssues] = useState<
    UnusualCharacterIssue[]
  >([])
  const [showProofreadModal, setShowProofreadModal] = useState(false)
  // Ref for file input to trigger file selection programmatically
  const fileInputRef = useRef<HTMLInputElement>(null)

  const recheckAtomExistence = useCallback(() => {
    checkExistingAtoms(csvData, selectedType)
    checkTagExists()
  }, [csvData, selectedType])

  const {
    step,
    requestHash,
    isLoading,
    initiateBatchRequest,
    setSelectedType: setBatchCreateAtomSelectedType,
  } = useBatchCreateAtom(recheckAtomExistence)

  const {
    step: tagStep,
    requestHash: tagRequestHash,
    isLoading: isTagLoading,
    initiateTagRequest,
  } = useBatchCreateTriple()

  // Add this state near other state declarations
  const [tagExists, setTagExists] = useState(false)
  const [isCheckingTag, setIsCheckingTag] = useState(false)

  const [tooltipsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tooltipsEnabled')
      return saved ? JSON.parse(saved) : true
    }
    return true
  })

  const useLoadedCSVData = () => {
    const [loadedCSVData, setLoadedCSVDataRaw] = useState<string[][]>([])

    // Wrap the setter to enforce deep copying
    const setLoadedCSVData = useCallback((data: string[][]) => {
      setLoadedCSVDataRaw(JSON.parse(JSON.stringify(data)))
    }, [])

    return [loadedCSVData, setLoadedCSVData] as const
  }

  const [isCSVDataModified, setIsCSVDataModified] = useState(false)
  const [loadedCSVData, setLoadedCSVData] = useLoadedCSVData() // enforces deep copy

  // Effect to check if the CSV data is worth saving
  useEffect(() => {
    if (csvData.length === 0) {
      setIsCSVDataModified(false)
      return
    }

    // Check against both default and loaded data
    const matchesDefault =
      JSON.stringify(csvData) ===
      JSON.stringify(atomDataTypes[selectedType].defaultData)
    const matchesLoaded =
      JSON.stringify(csvData) === JSON.stringify(loadedCSVData)

    // Data is modified if it matches neither the default nor the loaded data
    setIsCSVDataModified(!matchesDefault && !matchesLoaded)
  }, [csvData, loadedCSVData, selectedType])

  // Function to load thumbnails for image URLs in the CSV data
  const loadThumbnailsForCSV = useCallback(async (data: string[][]) => {
    const imageColumnIndex = data[0].indexOf('image')
    if (imageColumnIndex === -1) {
      return
    }

    const imageUrls = data.slice(1).map((row) => row[imageColumnIndex])
    const thumbnailUrls = await loadThumbnails(imageUrls)

    const newThumbnails: Record<number, string> = {}
    thumbnailUrls.forEach((url, index) => {
      newThumbnails[index + 1] = url
    })

    setThumbnails(newThumbnails)
  }, [])

  // Effect to load thumbnails when CSV data changes
  useEffect(() => {
    if (csvData.length > 0) {
      loadThumbnailsForCSV(csvData)
    }
  }, [csvData, loadThumbnailsForCSV])

  // Function to show a confirmation modal with a custom message and callback
  const showConfirmModal = (
    message: string,
    callback?: (confirm: boolean) => void,
  ) => {
    setModalMessage(message)
    setModalCallback(() => callback || (() => {}))
    setShowModal(true)
  }

  // Function to handle user response to the confirmation modal
  const handleModalResponse = (confirm: boolean) => {
    setShowModal(false)
    modalCallback(confirm)
  }

  // Move checkExistingAtoms before loadCSV and handleApplyFixes
  const checkExistingAtoms = async (
    data: string[][],
    type: AtomDataTypeKey,
  ) => {
    const formData = new FormData()
    formData.append('action', 'checkAtomsExist')
    formData.append('csvData', JSON.stringify(data))
    formData.append('selectedType', type)

    try {
      setLoadingRows(new Set(data.slice(1).map((_, index) => index)))

      const response = await fetch('/api/csv-editor', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success && result.atomExistsResults) {
          const existingIndexes = new Set(
            result.atomExistsResults
              .filter(
                (result: AtomExistsResult | URIExistsResult) =>
                  result.alreadyExists,
              )
              .map(
                (result: AtomExistsResult | URIExistsResult) =>
                  result.originalIndex,
              ),
          )
          setExistingAtoms(
            new Set(
              Array.from(existingIndexes).filter(
                (index): index is number => typeof index === 'number',
              ),
            ),
          )
        }
      } else {
        console.error('Failed to check existing atoms')
      }
    } catch (error) {
      console.error('Error checking existing atoms:', error)
    } finally {
      setLoadingRows(new Set())
    }
  }

  // In the CSVEditor component, add this state
  const [formatChangeDialog, setFormatChangeDialog] =
    useState<FormatChangeDialog>({
      isOpen: false,
      newFormat: null,
    })

  // Update loadCSV to take a File directly
  const loadCSV = async (file: File) => {
    const text = await file.text()
    const headers = text.split('\n')[0].split(',')
    const detectedType = detectAtomDataType(headers)
    const rows = await parseCsv(file, detectedType)

    if (detectedType !== selectedType && isCSVDataModified) {
      setFormatChangeDialog({
        isOpen: true,
        newFormat: detectedType,
        onResponse: (response) => {
          if (response === 'cancel') {
            return
          }
          if (response === 'yes') {
            saveCSV()
          }
          setSelectedType(detectedType)
          setBatchCreateAtomSelectedType(detectedType)
          processLoadedData(rows, detectedType)
        },
      })
    } else {
      if (detectedType !== selectedType) {
        setSelectedType(detectedType)
        setBatchCreateAtomSelectedType(detectedType)
      }
      processLoadedData(rows, detectedType)
    }
  }

  // Update the file input handler
  const handleFileInput = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      await loadCSV(selectedFile)
    }
  }

  // Separate function to handle the data processing
  const processLoadedData = (rows: string[][], type: AtomDataTypeKey) => {
    setCsvData(rows)
    setLoadedCSVData(rows)

    const proofreadResult = proofreadAll(rows)

    if (proofreadResult.unusualCharacters.hasUnusualCharacters) {
      const adjustedIssues = proofreadResult.unusualCharacters.cellIssues
      setProofreadIssues(adjustedIssues)
      setShowProofreadModal(true)
    }

    if (proofreadResult.duplicates.hasDuplicates) {
      showConfirmModal(
        `Duplicative data found. ${proofreadResult.duplicates.duplicateIndices.length} duplicate row(s) will be removed. You can save over the old data using the Save CSV button.`,
        (confirm) => {
          if (confirm) {
            const finalRows = rows.filter(
              (_, index) =>
                !proofreadResult.duplicates.duplicateIndices.includes(index),
            )
            setCsvData(finalRows)
            checkExistingAtoms(finalRows, type)
          } else {
            checkExistingAtoms(rows, type)
          }
        },
      )
    } else {
      checkExistingAtoms(rows, type)
    }
  }

  // Function to handle applying fixes
  const handleApplyFixes = useCallback(
    (updatedIssues: UnusualCharacterIssue[]) => {
      setCsvData((prevData) => {
        if (prevData.length === 0) {
          console.error('CSV data is empty. Cannot apply fixes.')
          return prevData
        }

        const newData = [...prevData]
        updatedIssues.forEach((issue) => {
          if (issue.rowIndex >= 0 && issue.rowIndex < newData.length) {
            if (
              issue.cellIndex >= 0 &&
              issue.cellIndex < newData[issue.rowIndex].length
            ) {
              newData[issue.rowIndex][issue.cellIndex] = issue.suggestedValue
            } else {
              console.error(
                `Cell ${issue.cellIndex} does not exist in row ${issue.rowIndex}`,
              )
            }
          } else {
            console.error(
              `Row ${issue.rowIndex} is out of bounds (data length: ${newData.length})`,
            )
          }
        })

        checkExistingAtoms(newData, selectedType)
        return newData
      })
      setShowProofreadModal(false)
    },
    [checkExistingAtoms],
  )

  // Function to update cell highlights for a specific cell
  const updateCellHighlights = useCallback(
    (rowIndex: number, cellIndex: number) => {
      if (csvData.length > 1) {
        const dataIndices =
          sortedIndices.length > 0
            ? sortedIndices
            : csvData.slice(1).map((_, i) => i + 1)
        const newHighlights = detectAdjacentDuplicatesForCell(
          csvData,
          dataIndices,
          rowIndex,
          cellIndex,
        )

        setCellHighlights((prev) => {
          const filtered = prev.filter(
            (h) =>
              h.cellIndex !== cellIndex ||
              (h.rowIndex !== dataIndices.indexOf(rowIndex) &&
                h.rowIndex !== dataIndices.indexOf(rowIndex) - 1 &&
                h.rowIndex !== dataIndices.indexOf(rowIndex) + 1),
          )
          return [...filtered, ...newHighlights]
        })
      }
    },
    [csvData, sortedIndices],
  )

  // Function to add a new empty row to the CSV data
  const addNewRow = () => {
    setCsvData((prev: string[][]) => {
      const currentType = atomDataTypes[selectedType]
      const newRow = prev[0].map(
        (columnHeader: string) =>
          currentType.defaultValues?.[columnHeader] || '',
      )
      return [...prev, newRow]
    })
  }

  // Function to delete selected rows from the CSV data
  const deleteSelectedRows = () => {
    showConfirmModal(
      `Delete ${selectedRows.length > 1 ? 'selected rows' : 'selected row'}?`,
      (confirm) => {
        if (confirm) {
          setCsvData((prev: string[][]) => {
            // Ensure we always have at least the header row
            const newData = prev.filter(
              (_, index) => index === 0 || !selectedRows.includes(index - 1),
            )
            return newData.length > 1 ? newData : [prev[0]]
          })

          // Update sortedIndices
          setSortedIndices((prev) => {
            const newIndices = prev.filter(
              (index) => !selectedRows.includes(index - 1),
            )
            // Recompute indices to ensure they are consecutive
            return newIndices.map((_, index) => index + 1)
          })

          // Update existingAtoms
          setExistingAtoms((prev) => {
            const newSet = new Set(prev)
            selectedRows.forEach((row) => newSet.delete(row))
            return newSet
          })

          // Clear selected rows
          setSelectedRows([])

          // Update highlights
          setCsvData((currentCsvData: string[][]) => {
            setSortedIndices((currentSortedIndices) => {
              const dataIndices =
                currentSortedIndices.length > 0
                  ? currentSortedIndices
                  : currentCsvData.slice(1).map((_, i) => i + 1)
              const newHighlights = detectAllAdjacentDuplicates(
                currentCsvData,
                dataIndices,
              )
              setCellHighlights(newHighlights)
              return currentSortedIndices
            })
            return currentCsvData
          })
        }
      },
    )
  }

  const handlePublishAtoms = useCallback(() => {
    // Count existing and new atoms from selected rows
    const existingCount = selectedRows.filter((rowIndex) =>
      existingAtoms.has(rowIndex),
    ).length
    const totalSelected = selectedRows.length
    const newCount = totalSelected - existingCount

    const message = `${existingCount} out of the ${totalSelected} atom${
      totalSelected !== 1 ? 's' : ''
    } you selected already exist${existingCount !== 1 ? '' : 's'}, and ${newCount} new atom${
      newCount !== 1 ? 's' : ''
    } will be published. This will take about a minute.`

    showConfirmModal(message, (confirm) => {
      if (confirm) {
        initiateBatchRequest(selectedRows, csvData, selectedType)
      }
    })
  }, [
    showConfirmModal,
    initiateBatchRequest,
    selectedRows,
    csvData,
    selectedType,
    existingAtoms,
  ])

  // Function to determine the text for the create/tag atoms button
  const getCreateTagButtonText = useCallback(() => {
    return 'Tag Selected Atoms'
  }, [])

  // Function to handle creating and tagging atoms
  const handleCreateAndTagAtoms = useCallback(() => {
    // Convert selected rows to schema objects
    const schemaObjects = convertCsvToSchemaObjects<Thing>(csvData)
    const selectedAtoms = selectedRows.map((index) => schemaObjects[index])

    showConfirmModal(
      'Tag Selected Atoms?  This will take up to a minute or two.',
      (confirm) => {
        if (confirm) {
          initiateTagRequest(
            selectedRows,
            selectedAtoms,
            newTag as unknown as WithContext<Thing>,
          )
        }
      },
    )
  }, [selectedRows, csvData, newTag, initiateTagRequest, showConfirmModal])

  // Effect to reset tagging state when the action is complete
  useEffect(() => {
    if (navigation.state === 'idle' && isTagging) {
      setIsTagging(false)
    }
  }, [navigation.state, isTagging])

  // Function to toggle row selection
  const toggleRowSelection = (index: number) => {
    setSelectedRows((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index)
      }
      return [...prev, index]
    })
  }

  // Function to toggle selection of all rows
  const toggleAllRows = () => {
    if (selectedRows.length === csvData.length - 1) {
      setSelectedRows([])
    } else {
      setSelectedRows(csvData.slice(1).map((_, index) => index))
    }
  }

  // Function to adjust the height of a textarea input
  const adjustInputHeight = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto'
    element.style.height = `${element.scrollHeight}px`
  }

  // Add useRef for debouncing at the top of the component with other hooks
  const existenceCheckTimeout = useRef<NodeJS.Timeout>()

  // Update handleCellEdit to include debouncing
  const handleCellEdit = useCallback(
    async (rowIndex: number, cellIndex: number, value: string) => {
      setCsvData((prev: string[][]) => {
        const newData = [...prev]
        newData[rowIndex][cellIndex] = value
        return newData
      })

      // Handle image thumbnail updates
      if (csvData[0][cellIndex] === 'image') {
        loadThumbnail(value).then((thumbnail) => {
          setThumbnails((prev) => ({ ...prev, [rowIndex]: thumbnail }))
        })
      }

      // Clear any existing timeout
      if (existenceCheckTimeout.current) {
        clearTimeout(existenceCheckTimeout.current)
      }

      // Set the row as loading
      setLoadingRows((prev) => new Set(prev).add(rowIndex - 1))

      // Debounce the existence check (500ms)
      existenceCheckTimeout.current = setTimeout(async () => {
        // Check if the atom exists after editing
        const formData = new FormData()
        formData.append('action', 'checkAtomExists')
        formData.append('csvData', JSON.stringify(csvData))
        formData.append('index', (rowIndex - 1).toString())

        try {
          const response = await fetch('/api/csv-editor', {
            method: 'POST',
            body: formData,
          })

          if (response.ok) {
            const result = await response.json()
            if (result.success && result.atomExistsResults) {
              setExistingAtoms((prev) => {
                const newSet = new Set(prev)
                if (result.atomExistsResults[0].alreadyExists) {
                  newSet.add(rowIndex - 1)
                } else {
                  newSet.delete(rowIndex - 1)
                }
                return newSet
              })
            }
          } else {
            console.error('Failed to check atom existence')
          }
        } catch (error) {
          console.error('Error checking atom existence:', error)
        } finally {
          // Remove the row from loading state
          setLoadingRows((prev) => {
            const newSet = new Set(prev)
            newSet.delete(rowIndex - 1)
            return newSet
          })
        }
      }, 500)
    },
    [csvData],
  )

  // Simplify handleCellBlur to only handle height reset and highlights
  const handleCellBlur = useCallback(
    (
      e: React.FocusEvent<HTMLTextAreaElement>,
      rowIndex: number,
      cellIndex: number,
    ) => {
      e.target.style.height = '2rem' // Reset to default height

      // Check if the edited row is now a duplicate
      const editedRow = csvData[rowIndex]
      const proofreadResult = proofreadRow(editedRow, csvData, rowIndex)

      if (proofreadResult.isDuplicate) {
        showConfirmModal(
          'This row is now a duplicate. It will be removed.',
          (confirm) => {
            if (confirm) {
              setCsvData((prev) =>
                prev.filter((_, index) => index !== rowIndex),
              )
            }
          },
        )
      }

      updateCellHighlights(rowIndex, cellIndex)
    },
    [csvData, showConfirmModal, updateCellHighlights],
  )

  // Function to handle cell pasting content into cells
  const handleCellPaste = useCallback(
    async (
      e: React.ClipboardEvent<HTMLTextAreaElement>,
      rowIndex: number,
      cellIndex: number,
    ) => {
      if (csvData[0][cellIndex] === 'image') {
        const pastedText = e.clipboardData.getData('text')
        const thumbnail = await loadThumbnail(pastedText)
        setThumbnails((prev) => ({ ...prev, [rowIndex]: thumbnail }))
      }
    },
    [csvData],
  )

  // Functions to handle focus and blur events for adjusting input height
  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    adjustInputHeight(e.target)
  }

  // Function to save the current CSV data to a file
  const saveCSV = () => {
    const csvContent = generateCsvContent(csvData)
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'table_data.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setLoadedCSVData(csvData)
    }
  }

  // Function to handle sorting of CSV data
  const handleSort = (columnIndex: number) => {
    const newDirection = getNextSortDirection(
      sortState.column === columnIndex ? sortState.direction : null,
    )
    setSortState({ column: columnIndex, direction: newDirection })

    if (csvData.length > 1) {
      const newSortedIndices = sortData(csvData, {
        column: columnIndex,
        direction: newDirection,
      })
      setSortedIndices(newSortedIndices)

      // Recompute highlights based on the new order
      const newHighlights = detectAllAdjacentDuplicates(
        csvData,
        newSortedIndices,
      )
      setCellHighlights(newHighlights)
    }
  }

  // // Function to save options (currently not fully implemented)
  // const handleSaveOptions = () => {
  //   console.log('Options saved:', options)
  //   setShowOptions(false)
  // }

  useEffect(() => {
    if (actionData && 'success' in actionData && actionData.success) {
      if ('requestHash' in actionData) {
        setShowProgressModal(true)
      }
      if ('calls' in actionData) {
        // setCalls(actionData.calls)
      }
    }
  }, [actionData])

  // Add this function to handle tag creation
  const handleCreateTag = useCallback(() => {
    const tagAtom = {
      '@context': newTag['@context'],
      '@type': newTag['@type'],
      name: newTag.name,
      description: newTag.description,
      image: newTag.image,
      url: newTag.url,
    }

    showConfirmModal(
      'Create tag as atom? This will take about a minute.',
      (confirm) => {
        if (confirm) {
          initiateBatchRequest(
            [0],
            [
              ['@context', '@type', 'name', 'description', 'image', 'url'],
              [
                tagAtom['@context'],
                tagAtom['@type'],
                tagAtom.name,
                tagAtom.description,
                tagAtom.image,
                tagAtom.url,
              ],
            ],
            'CSV',
          )
        }
      },
    )
  }, [newTag, initiateBatchRequest, showConfirmModal])

  // Add this function to check if tag exists
  const checkTagExists = useCallback(async () => {
    // Consider tag as non-existent if all fields are empty/default
    if (!newTag.name && !newTag.description && !newTag.image && !newTag.url) {
      setTagExists(false)
      return
    }

    setIsCheckingTag(true)
    const formData = new FormData()
    formData.append('action', 'checkAtomExists')
    formData.append(
      'csvData',
      JSON.stringify([
        ['@context', '@type', 'name', 'description', 'image', 'url'],
        [
          newTag['@context'],
          newTag['@type'],
          newTag.name,
          newTag.description,
          newTag.image,
          newTag.url,
        ],
      ]),
    )
    formData.append('index', '0')
    formData.append('selectedType', 'CSV') // Tags are always CSV/Schema format

    try {
      const response = await fetch('/api/csv-editor', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success && result.atomExistsResults) {
          setTagExists(result.atomExistsResults[0].alreadyExists)
        }
      }
    } catch (error) {
      console.error('Error checking tag existence:', error)
    } finally {
      setIsCheckingTag(false)
    }
  }, [newTag])

  // Set default CSV data to Thing Schema
  useEffect(() => {
    if (csvData.length === 0) {
      setCsvData(
        JSON.parse(JSON.stringify(atomDataTypes[selectedType].defaultData)),
      )
    }
  }, [csvData.length, selectedType])

  // Add this effect to check tag existence when tag fields change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkTagExists()
    }, 500) // Debounce the check

    return () => clearTimeout(timeoutId)
  }, [newTag, checkTagExists])

  // Add effect to recheck atoms when progress modal closes
  useEffect(() => {
    if (!isLoading && step === 'complete' && csvData.length > 0) {
      checkExistingAtoms(csvData, selectedType)
    }
  }, [isLoading, step, csvData])

  // Add effect to recheck tag existence when tag creation completes
  useEffect(() => {
    if (!isLoading && step === 'complete') {
      checkTagExists()
    }
  }, [isLoading, step, checkTagExists])

  // Keep the format change dialog for manual type changes
  const handleFormatChange = (newFormat: AtomDataTypeKey) => {
    if (isCSVDataModified) {
      setFormatChangeDialog({
        isOpen: true,
        newFormat,
      })
    } else {
      setSelectedType(newFormat)
      setBatchCreateAtomSelectedType(newFormat)
      setCsvData(
        JSON.parse(JSON.stringify(atomDataTypes[newFormat].defaultData)),
      )
    }
  }

  // Simplify the format change response handler
  const handleFormatChangeResponse = (response: 'yes' | 'no' | 'cancel') => {
    if (!formatChangeDialog.newFormat || response === 'cancel') {
      setFormatChangeDialog({ isOpen: false, newFormat: null })
      return
    }

    if (response === 'yes') {
      saveCSV()
    }

    // If we have an onResponse callback (from loading CSV), use that
    if (formatChangeDialog.onResponse) {
      formatChangeDialog.onResponse(response)
    } else {
      // Otherwise this is from manual type change, set to default data
      setSelectedType(formatChangeDialog.newFormat)
      setBatchCreateAtomSelectedType(formatChangeDialog.newFormat)
      setCsvData(
        JSON.parse(
          JSON.stringify(
            atomDataTypes[formatChangeDialog.newFormat].defaultData,
          ),
        ),
      )
    }

    setFormatChangeDialog({ isOpen: false, newFormat: null })
  }

  return (
    <>
      <div className="container mx-auto p-0 border border-primary/30 rounded-lg my-4">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as ViewTab)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4 rounded-b-none border-b border-primary/10">
            {tabs.map((tab, index) => (
              <TabsTrigger key={tab.id} value={tab.id} className="relative">
                <span
                  className={cn(
                    'absolute top-0 left-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold -translate-x-1/2 -translate-y-1/2',
                    activeTab === tab.id
                      ? 'bg-accent text-foreground'
                      : 'bg-muted text-foreground/70 border border-primary/10',
                  )}
                >
                  {index + 1}
                </span>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="select" className="p-5">
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FileType className="w-6 h-6" strokeWidth={1.5} />
                  <Text variant={TextVariant.headline}>Select Data Type</Text>
                </div>
                <Text
                  variant={TextVariant.body}
                  className="text-muted-foreground"
                >
                  To start, select the type of atom data you are uploading. Use{' '}
                  {'<Thing>'} for atom with metadata, or CAIP-10 for a smart
                  contract, or URI for a raw URI (advanced). Refer to{' '}
                  <a href="#" target="_blank" className="underline">
                    documentation
                  </a>{' '}
                  for more details.
                </Text>
              </div>
              <div className="">
                <div className="flex items-center mb-4">
                  <div className="space-y-2">
                    <Select
                      value={selectedType}
                      onValueChange={handleFormatChange}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(atomDataTypes).map(([key, type]) => (
                          <SelectItem key={key} value={key}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => setActiveTab('upload')}
                  disabled={!selectedType}
                >
                  Continue
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="upload" className="p-5">
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FileSpreadsheet className="w-6 h-6" strokeWidth={1.5} />
                  <Text variant={TextVariant.headline}>Upload CSV</Text>
                </div>
                <Text
                  variant={TextVariant.body}
                  className="text-muted-foreground"
                >
                  Upload a CSV file to begin. Once the file is uploaded, we will
                  will automatically perform some basic proofreading. <br />
                  Refer to{' '}
                  <a href="#" target="_blank" className="underline">
                    documentation
                  </a>{' '}
                  for formatting requirements.
                </Text>
              </div>
              <CsvUploader
                file={file}
                setFile={setFile}
                onFileChange={loadCSV}
              />
              <div className="flex justify-end">
                <Button
                  onClick={() => setActiveTab('publish')}
                  disabled={!file}
                >
                  Continue
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="publish" className="p-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <BookCheck className="w-6 h-6" strokeWidth={1.5} />
                  <Text variant={TextVariant.headline}>Publish Atoms</Text>
                </div>
                <Text
                  variant={TextVariant.body}
                  className="text-muted-foreground"
                >
                  Begin the process by uploading atoms to Intuition.
                  Pre-existing atoms will automatically be omitted from
                  publishing. <br />
                  Refer to{' '}
                  <a href="#" target="_blank" className="underline">
                    documentation
                  </a>{' '}
                  for more details.
                </Text>
              </div>
              <div className="border border-dashed border-warning/30 rounded-lg p-6 text-center text-warning bg-warning/15">
                Placeholder for validation
              </div>
              <div className="flex justify-end">
                {tooltipsEnabled ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handlePublishAtoms}
                        disabled={selectedRows.length === 0 || isLoading}
                      >
                        {isLoading ? 'Processing...' : 'Publish Selected Atoms'}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {getTooltip(TooltipKey.PUBLISH_ATOMS)}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Button
                    onClick={handlePublishAtoms}
                    disabled={selectedRows.length === 0 || isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Publish Selected Atoms'}
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="tag" className="p-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <TagIcon className="w-6 h-6" strokeWidth={1.5} />
                  <Text variant={TextVariant.headline}>Tag Atoms</Text>
                </div>
                <Text
                  variant={TextVariant.body}
                  className="text-muted-foreground"
                >
                  Organize your published atoms by adding tags via triples. The
                  tag atoms must be published first, and the tag must be
                  created.
                  <br />
                  Refer to{' '}
                  <a href="#" target="_blank" className="underline">
                    documentation
                  </a>{' '}
                  for more details.
                </Text>
              </div>
              <>
                {/* Move buttons to top */}

                {/* Tag status indicator */}
                <div className="flex items-center space-x-2 mt-4">
                  {isCheckingTag ? (
                    <Loader2 className="animate-spin text-blue-500 w-5 h-5" />
                  ) : tagExists ? (
                    tooltipsEnabled ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <BookCheck className="text-success w-5 h-5" />
                        </TooltipTrigger>
                        <TooltipContent>
                          {getTooltip(TooltipKey.TAG_LIVE)}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <BookCheck className="text-success w-5 h-5" />
                    )
                  ) : isCheckingTag === false ? (
                    tooltipsEnabled ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <CirclePlus
                            className="text-accent w-5 h-5"
                            strokeWidth={1.5}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          {getTooltip(TooltipKey.TAG_NOT_PUBLISHED)}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <CirclePlus
                        className="text-accent w-5 h-5"
                        strokeWidth={1.5}
                      />
                    )
                  ) : null}
                </div>

                {/* Tag input fields */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {Object.keys(newTag).map((key) => (
                    <div key={key}>
                      <label
                        htmlFor={key}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {key}
                      </label>
                      <Input
                        id={key}
                        value={newTag[key]}
                        onChange={(e) =>
                          setNewTag((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                        disabled={key === '@context' || key === '@type'}
                      />
                    </div>
                  ))}
                </div>
              </>
              <div className="flex justify-end">
                <div className="flex space-x-4 h-8 mt-2">
                  {tooltipsEnabled ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="h-8"
                          onClick={handleCreateTag}
                          disabled={tagExists}
                        >
                          Create Tag
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {getTooltip(TooltipKey.CREATE_TAG)}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Button
                      className="h-8"
                      onClick={handleCreateTag}
                      disabled={tagExists}
                    >
                      Create Tag
                    </Button>
                  )}
                  {tooltipsEnabled ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="h-8"
                          onClick={handleCreateAndTagAtoms}
                          disabled={
                            selectedRows.length === 0 ||
                            !tagExists ||
                            isTagging ||
                            navigation.state === 'submitting'
                          }
                        >
                          {isTagging || navigation.state === 'submitting' ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Tagging...
                            </>
                          ) : (
                            getCreateTagButtonText()
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {getTooltip(TooltipKey.TAG_ATOMS)}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Button
                      className="h-8"
                      onClick={handleCreateAndTagAtoms}
                      disabled={
                        selectedRows.length === 0 ||
                        !tagExists ||
                        isTagging ||
                        navigation.state === 'submitting'
                      }
                    >
                      {isTagging || navigation.state === 'submitting' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Tagging...
                        </>
                      ) : (
                        getCreateTagButtonText()
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Main content */}
      <div className="container mx-auto p-0 space-y-6 relative">
        <div className="flex space-x-4 h-8 mt-2"></div>

        {/* Progress bar */}
        {isLoading && <Progress value={undefined} className="w-full" />}

        {/* CSV data table */}
        {csvData.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-primary/30">
            <div className="w-full border-b border-primary/15 bg-gradient-to-r from-primary/10 to-primary/5">
              <div className="w-full flex justify-between items-center px-4 py-2 h-12">
                <div className="text-sm tracking-wide uppercase">
                  {selectedRows.length > 0 ? (
                    <>
                      <span className="text-foreground">
                        {selectedRows.length}
                      </span>
                      <span className="text-foreground/70"> Selected</span>
                    </>
                  ) : (
                    <>
                      <span className="text-foreground/70">Rows</span>{' '}
                      {csvData.length - 1}
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {tooltipsEnabled ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={ButtonVariant.secondary}
                          onClick={saveCSV}
                          disabled={!isCSVDataModified}
                        >
                          <Download className="h-4 w-4" /> Save CSV
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {getTooltip(TooltipKey.SAVE_CSV)}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Button
                      variant={ButtonVariant.secondary}
                      onClick={saveCSV}
                      disabled={!isCSVDataModified}
                    >
                      <Save className="h-4 w-4" /> Save CSV
                    </Button>
                  )}
                  <div className={`${selectedRows.length > 0 ? '' : 'hidden'}`}>
                    {tooltipsEnabled ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={ButtonVariant.secondary}
                            onClick={deleteSelectedRows}
                            disabled={selectedRows.length === 0 || isLoading}
                          >
                            {isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash className="h-4 w-4" />
                            )}
                            Delete Row
                            {selectedRows.length > 1 ? 's' : ''}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {getTooltip(TooltipKey.DELETE_ROWS)}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Button
                        variant={ButtonVariant.secondary}
                        onClick={deleteSelectedRows}
                        disabled={selectedRows.length === 0 || isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash className="h-4 w-4" />
                        )}
                        Delete Row{selectedRows.length > 1 ? 's' : ''}
                      </Button>
                    )}
                  </div>
                  {tooltipsEnabled ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={ButtonVariant.secondary}
                          onClick={addNewRow}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                          Add New Row
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {getTooltip(TooltipKey.ADD_ROW)}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Button
                      variant={ButtonVariant.secondary}
                      onClick={addNewRow}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                      Add New Row
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="cursor-pointer w-12"
                      onClick={toggleAllRows}
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedRows.length === csvData.length - 1}
                          onCheckedChange={toggleAllRows}
                          className="w-4 h-4"
                        />
                      </div>
                    </TableHead>
                    {/* New column for checkmark */}
                    {csvData[0].map((header, index) => (
                      <TableHead
                        key={index}
                        className={`cursor-pointer ${
                          header === '@context'
                            ? 'w-40'
                            : header === '@type'
                              ? 'w-24'
                              : header === 'name'
                                ? 'w-48'
                                : header === 'image'
                                  ? 'w-64'
                                  : ''
                        }`}
                        onClick={() => handleSort(index)}
                      >
                        <div className="flex items-center space-x-2">
                          <span>{header}</span>
                          {sortState.column === index && (
                            <span>
                              {sortState.direction === 'asc' ? '▲' : '▼'}
                            </span>
                          )}
                        </div>
                      </TableHead>
                    ))}
                    <TableHead className="w-8"></TableHead>{' '}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(sortedIndices.length > 0
                    ? sortedIndices
                    : csvData.slice(1).map((_, i) => i + 1)
                  ).map((rowIndex, displayIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell className="w-12">
                        <Checkbox
                          checked={selectedRows.includes(rowIndex - 1)}
                          onCheckedChange={() =>
                            toggleRowSelection(rowIndex - 1)
                          }
                          className="w-4 h-4"
                        />
                      </TableCell>

                      {csvData[rowIndex].map((cell, cellIndex) => (
                        <TableCell
                          key={cellIndex}
                          className={`p-0 ${
                            csvData[0][cellIndex] === '@context'
                              ? 'w-40'
                              : csvData[0][cellIndex] === '@type'
                                ? 'w-24'
                                : csvData[0][cellIndex] === 'name'
                                  ? 'w-48'
                                  : csvData[0][cellIndex] === 'image'
                                    ? 'w-64'
                                    : ''
                          } ${
                            cellHighlights.some(
                              (highlight) =>
                                highlight.rowIndex === displayIndex &&
                                highlight.cellIndex === cellIndex,
                            )
                              ? 'border-warning border'
                              : ''
                          }`}
                        >
                          <div className="flex items-center p-1">
                            <Textarea
                              value={cell}
                              disabled={
                                csvData[0][cellIndex] === '@context' ||
                                csvData[0][cellIndex] === '@type'
                              }
                              onChange={(e) =>
                                handleCellEdit(
                                  rowIndex,
                                  cellIndex,
                                  e.target.value,
                                )
                              }
                              onFocus={handleFocus}
                              onBlur={(e) =>
                                handleCellBlur(e, rowIndex, cellIndex)
                              }
                              onPaste={(e) =>
                                handleCellPaste(e, rowIndex, cellIndex)
                              }
                              placeholder={
                                !cell &&
                                atomDataTypes[selectedType].defaultDescriptions[
                                  csvData[0][cellIndex]
                                ]
                                  ? atomDataTypes[selectedType]
                                      .defaultDescriptions[
                                      csvData[0][cellIndex]
                                    ]
                                  : ''
                              }
                              className={`w-full bg-transparent hover:bg-primary/5 focus-visible:bg-primary/5 border-none focus:outline-none focus:ring-0 focus-visible:ring-1 focus-visible:ring-primary/60 resize-none overflow-hidden h-8 ${
                                !cell ? 'text-gray-400 italic' : ''
                              }`}
                              readOnly={
                                csvData[0][cellIndex] === '@context' ||
                                csvData[0][cellIndex] === '@type'
                              }
                            />
                            {csvData[0][cellIndex] === 'image' &&
                              thumbnails[rowIndex] && (
                                <img
                                  src={thumbnails[rowIndex]}
                                  alt="Thumbnail"
                                  className="w-8 h-8 object-cover ml-2 flex-shrink-0"
                                />
                              )}
                          </div>
                        </TableCell>
                      ))}
                      <TableCell className="w-8 p-0">
                        <div className="flex items-center justify-center h-full">
                          {loadingRows.has(rowIndex - 1) ? (
                            <Loader2 className="animate-spin text-accent w-5 h-5" />
                          ) : existingAtoms.has(rowIndex - 1) ? (
                            tooltipsEnabled ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <BookCheck
                                    className="text-success w-5 h-5"
                                    strokeWidth={1.5}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  {getTooltip(TooltipKey.ATOM_LIVE)}
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              <BookCheck
                                className="text-success w-5 h-5"
                                strokeWidth={1.5}
                              />
                            )
                          ) : loadingRows.has(rowIndex - 1) === false ? (
                            tooltipsEnabled ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <CirclePlus
                                    className="text-accent w-5 h-5"
                                    strokeWidth={1.5}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  {getTooltip(TooltipKey.ATOM_NOT_PUBLISHED)}
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              <CirclePlus
                                className="text-accent w-5 h-5"
                                strokeWidth={1.5}
                              />
                            )
                          ) : null}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>

      {/* Add this confirmation modal dialog */}
      <Dialog
        open={showModal}
        onOpenChange={(open) => !open && setShowModal(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
          </DialogHeader>
          <p>{modalMessage}</p>
          <DialogFooter>
            <Button onClick={() => handleModalResponse(true)}>Confirm</Button>
            <Button
              variant="outline"
              onClick={() => handleModalResponse(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ProgressModal
        isOpen={isLoading || isTagLoading}
        onClose={() => {
          if (isLoading || isTagLoading) {
            console.log('Progress modal closed') // Leaving this here because this gets triggered when the modal loses focus
          }
        }}
        step={isTagLoading ? tagStep : step}
        requestHash={isTagLoading ? tagRequestHash : requestHash}
      />

      <ProofreadModal
        isOpen={showProofreadModal}
        onClose={() => setShowProofreadModal(false)}
        issues={proofreadIssues}
        onApplyFixes={handleApplyFixes}
      />

      {/* Format change confirmation dialog */}
      <Dialog
        open={formatChangeDialog.isOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setFormatChangeDialog({ isOpen: false, newFormat: null })
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Data Format?</DialogTitle>
          </DialogHeader>
          <p>
            Switching to a different Data Format will clear the Atoms View.
            Since you have unsaved atom data, would you like to save it first?
          </p>
          <DialogFooter className="flex space-x-2">
            <Button
              onClick={() => {
                handleFormatChangeResponse('yes')
              }}
            >
              Yes, Save First
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                handleFormatChangeResponse('no')
              }}
            >
              No, Continue Without Saving
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                handleFormatChangeResponse('cancel')
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
