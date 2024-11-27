import { useCallback, useEffect, useRef, useState } from 'react'

import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@0xintuition/1ui'

import { useBatchCreateAtom } from '@client/useBatchCreateAtom'
import { useBatchCreateTriple } from '@client/useBatchCreateTriple'
import { ProgressModal } from '@components/progress-modal'
import { ProofreadModal } from '@components/proofread-modal'
import { Progress } from '@components/ui/progress'
import {
  BatchAtomsRequest,
  createPopulateAtomsRequest,
  createTagAtomsRequest,
  generateBatchAtomsCalldata,
  generateTagAtomsCallData,
  logTransactionHashAndVerifyAtoms,
  logTransactionHashAndVerifyTriples,
  pinAtoms,
  PinDataResult,
} from '@lib/services/populate'
import { generateCsvContent, parseCsv } from '@lib/utils/csv'
import {
  defaultCSVData,
  defaultCSVDescriptions,
  defaultCSVValues,
} from '@lib/utils/default-data'
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
import {
  useActionData,
  useFetcher,
  useNavigation,
  useSubmit,
} from '@remix-run/react'
import { CheckCircle2, Loader2, Minus, Plus, Save, Search } from 'lucide-react'
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

        console.log('Initiating tag request from app+/index.tsx')

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
        const selectedAtoms = JSON.parse(
          formData.get('selectedAtoms') as string,
        ) as WithContext<Thing>[]
        console.log('Pinning atoms from app+/index.tsx')
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

// Revert useCSVData to its original simple form
const useCSVData = (initialData: string[][]) => {
  const [csvData, setCsvData] = useState<string[][]>(initialData)
  return [csvData, setCsvData] as const
}

export default function CSVEditor() {
  // State variables for managing CSV data, UI interactions, and atom-related operations

  const actionData = useActionData<ActionData>()
  const submit = useSubmit()
  const navigation = useNavigation()
  const fetcher = useFetcher()

  // Ensure we always have a deep copy of the CSV data
  const [csvData, setCsvData] = useCSVData([])
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
  const [llmInput, setLlmInput] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalCallback, setModalCallback] = useState<
    (confirm: boolean) => void
  >(() => {})
  const [thumbnails, setThumbnails] = useState<Record<number, string>>({})
  // const [imageCache, setImageCache] = useState<Record<string, string>>({})
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
  // const [setShowOptions] = useState(false)
  // const [options] = useState({
  //   rpc: '',
  //   multivault: '',
  //   privateKey: '',
  // })
  // const [showHistory, setShowHistory] = useState(false)
  const [, setShowProgressModal] = useState(false)
  const [proofreadIssues, setProofreadIssues] = useState<
    UnusualCharacterIssue[]
  >([])
  const [showProofreadModal, setShowProofreadModal] = useState(false)
  // const [calls, setCalls] = useState<BatchAtomsRequest[]>([])
  // Ref for file input to trigger file selection programmatically
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { step, requestHash, isLoading, initiateBatchRequest } =
    useBatchCreateAtom()

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
      JSON.stringify(csvData) === JSON.stringify(defaultCSVData)
    const matchesLoaded =
      JSON.stringify(csvData) === JSON.stringify(loadedCSVData)

    console.log('matchesDefault', matchesDefault)
    console.log('defaultCSVData', JSON.stringify(defaultCSVData))
    console.log('csvData', JSON.stringify(csvData))

    // Data is modified if it matches neither the default nor the loaded data
    setIsCSVDataModified(!matchesDefault && !matchesLoaded)
  }, [csvData, loadedCSVData])

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
  const checkExistingAtoms = async (data: string[][]) => {
    const formData = new FormData()
    formData.append('action', 'checkAtomsExist')
    formData.append('csvData', JSON.stringify(data))

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
              .filter((result: AtomExistsResult) => result.alreadyExists)
              .map((result: AtomExistsResult) => result.originalIndex),
          )
          console.log('Existing atom indexes:', existingIndexes)
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

  // Function to load and process a CSV file
  const loadCSV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const rows = await parseCsv(file)
      console.log('Parsed CSV rows:', rows.length)
      setCsvData(rows)
      setLoadedCSVData(rows)

      const proofreadResult = proofreadAll(rows)
      console.log('Proofread result:', proofreadResult)

      if (proofreadResult.unusualCharacters.hasUnusualCharacters) {
        const adjustedIssues = proofreadResult.unusualCharacters.cellIssues
        console.log('Adjusted issues:', adjustedIssues)
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
              checkExistingAtoms(finalRows)
            } else {
              checkExistingAtoms(rows)
            }
          },
        )
      } else {
        checkExistingAtoms(rows)
      }
    }
  }

  // Function to handle applying fixes
  const handleApplyFixes = useCallback(
    (updatedIssues: UnusualCharacterIssue[]) => {
      setCsvData((prevData) => {
        console.log('Current CSV data length:', prevData.length)
        if (prevData.length === 0) {
          console.error('CSV data is empty. Cannot apply fixes.')
          return prevData
        }

        const newData = [...prevData]
        updatedIssues.forEach((issue) => {
          console.log(
            `Processing issue: Row ${issue.rowIndex}, Column ${issue.cellIndex}`,
          )
          if (issue.rowIndex >= 0 && issue.rowIndex < newData.length) {
            if (
              issue.cellIndex >= 0 &&
              issue.cellIndex < newData[issue.rowIndex].length
            ) {
              console.log(
                `Updating value at [${issue.rowIndex}][${issue.cellIndex}]`,
              )
              console.log(
                `Old value: "${newData[issue.rowIndex][issue.cellIndex]}"`,
              )
              console.log(`New value: "${issue.suggestedValue}"`)
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

        checkExistingAtoms(newData)
        return newData
      })
      setShowProofreadModal(false)
    },
    [checkExistingAtoms],
  )

  // // Function to update all cell highlights based on adjacent duplicates
  // const updateAllHighlights = useCallback(() => {
  //   setCsvData((currentCsvData) => {
  //     setSortedIndices((currentSortedIndices) => {
  //       if (currentCsvData.length > 1) {
  //         const dataIndices =
  //           currentSortedIndices.length > 0
  //             ? currentSortedIndices
  //             : currentCsvData.slice(1).map((_, i) => i + 1)
  //         const highlights = detectAllAdjacentDuplicates(
  //           currentCsvData,
  //           dataIndices,
  //         )
  //         setCellHighlights(highlights)
  //       } else {
  //         setCellHighlights([])
  //       }
  //       return currentSortedIndices
  //     })
  //     return currentCsvData
  //   })
  // }, [])

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

  // // Function to process loaded CSV data, including duplicate detection and highlighting
  // const processLoadedCSV = (rows: string[][]) => {
  //   setCsvData(rows)
  //   setLoadingRows(new Set(rows.slice(1).map((_, index) => index)))
  //   checkExistingAtoms(rows)

  //   // Initialize sortedIndices for the newly loaded data
  //   const initialSortedIndices = rows.slice(1).map((_, index) => index + 1)
  //   setSortedIndices(initialSortedIndices)

  //   // Perform initial highlighting
  //   const initialHighlights = detectAllAdjacentDuplicates(
  //     rows,
  //     initialSortedIndices,
  //   )
  //   setCellHighlights(initialHighlights)
  // }

  // Function to add a new empty row to the CSV data
  const addNewRow = () => {
    setCsvData((prev: string[][]) => {
      const newRow = prev[0].map(
        (columnHeader: string) => defaultCSVValues[columnHeader] || '',
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
    showConfirmModal(
      'Publish selected atoms? This will take about a minute.',
      (confirm) => {
        if (confirm) {
          initiateBatchRequest(selectedRows, csvData)
        }
      },
    )
  }, [showConfirmModal, initiateBatchRequest, selectedRows, csvData])

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

  // Function to handle cell edits
  const handleCellEdit = useCallback(
    (rowIndex: number, cellIndex: number, value: string) => {
      setCsvData((prev: string[][]) => {
        const newData = [...prev]
        newData[rowIndex][cellIndex] = value
        return newData
      })

      if (csvData[0][cellIndex] === 'image') {
        loadThumbnail(value).then((thumbnail) => {
          setThumbnails((prev) => ({ ...prev, [rowIndex]: thumbnail }))
        })
      }
    },
    [csvData],
  )

  // Function to handle cell blur events, including duplicate checking and atom existence verification
  const handleCellBlur = useCallback(
    async (
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
        return
      }

      // Set the row as loading
      setLoadingRows((prev) => new Set(prev).add(rowIndex - 1))

      // Check if the atom exists after editing any cell in the row
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
            const atomExistsResult = result.atomExistsResults[0]
            setExistingAtoms((prev) => {
              const newSet = new Set(prev)
              if (atomExistsResult.alreadyExists) {
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

      // Handle image thumbnail update
      if (csvData[0][cellIndex] === 'image') {
        const value = e.target.value
        const thumbnail = await loadThumbnail(value)
        setThumbnails((prev) => ({ ...prev, [rowIndex]: thumbnail }))
      }

      updateCellHighlights(rowIndex, cellIndex)
    },
    [csvData, updateCellHighlights],
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

  // const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
  //   e.target.style.height = '2rem' // Reset to default height
  // }

  // Function to search for atoms (currently not implemented)
  const searchAtoms = (searchQuery: string) => {
    fetcher.load(`/api/csv-editor?action=searchAtoms&query=${searchQuery}`)
  }

  // // Function to add an atom to the CSV table
  // const addAtomToTable = (atom: string[]) => {
  //   setCsvData((prev) => [...prev, atom])
  // }

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

  // Function to handle LLM interaction (currently not implemented)
  const handleLLMInteraction = () => {
    submit({ action: 'llmInteraction', llmInput }, { method: 'post' })
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
          // Use the existing batch create flow with just one atom
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
      // Only set if no data exists
      setCsvData(defaultCSVData)
    }
  }, [csvData.length])

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
      checkExistingAtoms(csvData)
    }
  }, [isLoading, step, csvData])

  // Add effect to recheck tag existence when tag creation completes
  useEffect(() => {
    if (!isLoading && step === 'complete') {
      checkTagExists()
    }
  }, [isLoading, step, checkTagExists])

  // The main render function, containing the UI structure
  return (
    <>
      {/* Main content */}
      <div className="container mx-auto p-4 space-y-6 relative">
        {/* Add the file input before the buttons */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={loadCSV}
          style={{ display: 'none' }}
          accept=".csv"
        />

        <div className="flex space-x-4">
          {tooltipsEnabled ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => fileInputRef.current?.click()}>
                  Load CSV
                </Button>
              </TooltipTrigger>
              <TooltipContent>{getTooltip(TooltipKey.LOAD_CSV)}</TooltipContent>
            </Tooltip>
          ) : (
            <Button onClick={() => fileInputRef.current?.click()}>
              Load CSV
            </Button>
          )}

          {tooltipsEnabled ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={addNewRow} disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  Add New Row
                </Button>
              </TooltipTrigger>
              <TooltipContent>{getTooltip(TooltipKey.ADD_ROW)}</TooltipContent>
            </Tooltip>
          ) : (
            <Button onClick={addNewRow} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              Add New Row
            </Button>
          )}

          {tooltipsEnabled ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={deleteSelectedRows}
                  disabled={selectedRows.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Minus className="h-4 w-4" />
                  )}
                  Delete Selected Row{selectedRows.length > 1 ? 's' : ''}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {getTooltip(TooltipKey.DELETE_ROWS)}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button
              onClick={deleteSelectedRows}
              disabled={selectedRows.length === 0 || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Minus className="h-4 w-4" />
              )}
              Delete Selected Row{selectedRows.length > 1 ? 's' : ''}
            </Button>
          )}

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

          {tooltipsEnabled ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={saveCSV} disabled={!isCSVDataModified}>
                  <Save className="h-4 w-4" /> Save CSV
                </Button>
              </TooltipTrigger>
              <TooltipContent>{getTooltip(TooltipKey.SAVE_CSV)}</TooltipContent>
            </Tooltip>
          ) : (
            <Button onClick={saveCSV} disabled={!isCSVDataModified}>
              <Save className="h-4 w-4" /> Save CSV
            </Button>
          )}
        </div>

        {/* Progress bar for loading states */}
        {isLoading && <Progress value={undefined} className="w-full" />}

        {/* CSV data table */}
        {csvData.length > 0 && (
          <>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Atoms View</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8"></TableHead>{' '}
                      {/* New column for checkmark */}
                      {csvData[0].map((header, index) => (
                        <TableHead
                          key={index}
                          className={`cursor-pointer hover:bg-gray-100 ${
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
                      <TableHead
                        className="cursor-pointer hover:bg-gray-100 w-16"
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(sortedIndices.length > 0
                      ? sortedIndices
                      : csvData.slice(1).map((_, i) => i + 1)
                    ).map((rowIndex, displayIndex) => (
                      <TableRow key={rowIndex}>
                        <TableCell className="w-8 p-0">
                          {loadingRows.has(rowIndex - 1) ? (
                            <Loader2 className="animate-spin text-blue-500 w-5 h-5" />
                          ) : existingAtoms.has(rowIndex - 1) ? (
                            <CheckCircle2 className="text-green-500 w-5 h-5" />
                          ) : null}
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
                                ? 'border-yellow-400 border-2'
                                : ''
                            }`}
                          >
                            <div className="flex items-center">
                              <Textarea
                                value={cell}
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
                                  defaultCSVDescriptions[csvData[0][cellIndex]]
                                    ? defaultCSVDescriptions[
                                        csvData[0][cellIndex]
                                      ]
                                    : ''
                                }
                                className={`w-full border-none focus:outline-none focus:ring-0 resize-none overflow-hidden h-8 ${
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
                        <TableCell className="w-16">
                          <Checkbox
                            checked={selectedRows.includes(rowIndex - 1)}
                            onCheckedChange={() =>
                              toggleRowSelection(rowIndex - 1)
                            }
                            className="w-4 h-4"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </>
        )}

        {/* Add a horizontal divider */}
        <hr className="my-6 border-gray-200" />

        {/* Tag creation section with all its content */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">Tag View</h3>
            {isCheckingTag ? (
              <Loader2 className="animate-spin text-blue-500 w-5 h-5" />
            ) : tagExists ? (
              <CheckCircle2 className="text-green-500 w-5 h-5" />
            ) : null}
          </div>
          <div className="grid grid-cols-2 gap-4">
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
                    setNewTag((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  disabled={key === '@context' || key === '@type'}
                />
              </div>
            ))}
          </div>
          <div className="flex space-x-4">
            {tooltipsEnabled ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleCreateAndTagAtoms}
                    disabled={
                      selectedRows.length === 0 ||
                      !tagExists || // Disable if tag doesn't exist
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
                onClick={handleCreateAndTagAtoms}
                disabled={
                  selectedRows.length === 0 ||
                  !tagExists || // Disable if tag doesn't exist
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

            {tooltipsEnabled ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleCreateTag}
                    disabled={tagExists} // Disable only if tag exists
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
                onClick={handleCreateTag}
                disabled={tagExists} // Disable only if tag exists
              >
                Create Tag
              </Button>
            )}
          </div>
        </div>

        {/* Add a horizontal divider */}
        <hr className="my-6 border-gray-200" />

        {/* Search for Atom section */}
        <div className="space-y-4 opacity-50 pointer-events-none">
          <h3 className="text-lg font-semibold">Search for Atom</h3>
          <div className="flex space-x-4">
            {tooltipsEnabled ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => searchAtoms('query')}>
                    <Search className="mr-2 h-4 w-4" /> Search
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{getTooltip(TooltipKey.SEARCH)}</TooltipContent>
              </Tooltip>
            ) : (
              <Button onClick={() => searchAtoms('query')}>
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            )}
          </div>
          <p className="text-red-500 font-bold">Under Construction</p>
          {/* ... existing search results table ... */}
        </div>

        {/* Add another horizontal divider */}
        <hr className="my-6 border-gray-200" />

        {/* LLM Interaction section */}
        <div className="space-y-2 opacity-50 pointer-events-none">
          <h3 className="text-lg font-semibold">LLM Interaction</h3>
          <Textarea
            value={llmInput}
            onChange={(e) => setLlmInput(e.target.value)}
            placeholder="Enter your message for the LLM"
            rows={4}
          />
          {tooltipsEnabled ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleLLMInteraction}>Send to LLM</Button>
              </TooltipTrigger>
              <TooltipContent>
                {getTooltip(TooltipKey.SEND_TO_LLM)}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button onClick={handleLLMInteraction}>Send to LLM</Button>
          )}
          <p className="text-red-500 font-bold">Under Construction</p>
        </div>

        {/* Confirmation modal */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notification</DialogTitle>
            </DialogHeader>
            <p>{modalMessage}</p>
            <DialogFooter>
              <Button onClick={() => handleModalResponse(true)}>OK</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <ProgressModal
        isOpen={isLoading || isTagLoading}
        onClose={() => {
          console.log('Progress modal closed')
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
    </>
  )
}
