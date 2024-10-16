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
} from '@0xintuition/1ui'

import { ProgressModal } from '@components/progress-modal'
import { ProofreadModal } from '@components/proofread-modal'
import { Progress } from '@components/ui/progress'
import { generateCsvContent, parseCsv } from '@lib/utils/csv'
import { loadThumbnail, loadThumbnails } from '@lib/utils/image'
import {
  detectAdjacentDuplicatesForCell,
  detectAllAdjacentDuplicates,
  proofreadAll,
  proofreadRow,
  type CellHighlight,
  type UnusualCharacterIssue,
} from '@lib/utils/proofread'
import type { SortDirection } from '@lib/utils/sort'
import { getNextSortDirection, sortData } from '@lib/utils/sort'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import {
  useActionData,
  useFetcher,
  useNavigation,
  useSubmit,
} from '@remix-run/react'
import { CheckCircle2, Loader2, Minus, Plus, Save, Search } from 'lucide-react'

// Add this new interface
interface AtomExistsResult {
  cid: string
  filteredObj: any
  alreadyExists: boolean
  originalIndex: number
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    console.log('Enter action')
    const formData = await request.formData()
    console.log('Form data', formData)

    // TESTING
    const url = new URL(request.url)
    const apiUrl = `${url.protocol}//${url.host}/api/csv-editor`

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    })
    return json(await response.json())
  } catch (error) {
    console.error('Action error:', error)
    return json({ error: 'An error occurred' })
  }
}

export default function CSVEditor() {
  // State variables for managing CSV data, UI interactions, and atom-related operations
  const actionData = useActionData<typeof action>()
  const submit = useSubmit()
  const navigation = useNavigation()
  const fetcher = useFetcher()

  const [csvData, setCsvData] = useState<string[][]>([])
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [tags, setTags] = useState<string[][]>([])
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
  const [searchQuery, setSearchQuery] = useState('')
  const [thumbnails, setThumbnails] = useState<Record<number, string>>({})
  const [imageCache, setImageCache] = useState<Record<string, string>>({})
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
  const [showOptions, setShowOptions] = useState(false)
  const [options, setOptions] = useState({
    rpc: '',
    multivault: '',
    privateKey: '',
  })
  const [showHistory, setShowHistory] = useState(false)
  const [showProgressModal, setShowProgressModal] = useState(false)
  const [currentRequestHash, setCurrentRequestHash] = useState('')
  const [proofreadIssues, setProofreadIssues] = useState<
    UnusualCharacterIssue[]
  >([])
  const [showProofreadModal, setShowProofreadModal] = useState(false)

  // Ref for file input to trigger file selection programmatically
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Flag to determine if any loading operation is in progress
  const isLoading =
    navigation.state === 'submitting' || fetcher.state === 'submitting'

  // Function to load thumbnails for image URLs in the CSV data
  const loadThumbnailsForCSV = useCallback(async (data: string[][]) => {
    const imageColumnIndex = data[0].indexOf('image')
    if (imageColumnIndex === -1) return

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

  // Function to load and process a CSV file
  const loadCSV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const rows = await parseCsv(file)
      console.log('Parsed CSV rows:', rows.length)
      setCsvData(rows) // Set the CSV data immediately

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
            }
          },
        )
      }

      checkExistingAtoms(rows)
    }
  }

  // Add this function to handle applying fixes
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
        return newData
      })
      setShowProofreadModal(false)
    },
    [],
  )

  // Function to update all cell highlights based on adjacent duplicates
  const updateAllHighlights = useCallback(() => {
    setCsvData((currentCsvData) => {
      setSortedIndices((currentSortedIndices) => {
        if (currentCsvData.length > 1) {
          const dataIndices =
            currentSortedIndices.length > 0
              ? currentSortedIndices
              : currentCsvData.slice(1).map((_, i) => i + 1)
          const highlights = detectAllAdjacentDuplicates(
            currentCsvData,
            dataIndices,
          )
          setCellHighlights(highlights)
        } else {
          setCellHighlights([])
        }
        return currentSortedIndices
      })
      return currentCsvData
    })
  }, [])

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

  // Function to process loaded CSV data, including duplicate detection and highlighting
  const processLoadedCSV = (rows: string[][]) => {
    setCsvData(rows)
    setLoadingRows(new Set(rows.slice(1).map((_, index) => index)))
    checkExistingAtoms(rows)

    // Initialize sortedIndices for the newly loaded data
    const initialSortedIndices = rows.slice(1).map((_, index) => index + 1)
    setSortedIndices(initialSortedIndices)

    // Perform initial highlighting
    const initialHighlights = detectAllAdjacentDuplicates(
      rows,
      initialSortedIndices,
    )
    setCellHighlights(initialHighlights)
  }

  // Function to check which atoms already exist in the system
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
          setExistingAtoms(new Set(existingIndexes as number[]))
        }
      } else {
        console.error('Failed to check existing atoms')
      }
    } catch (error) {
      console.error('Error checking existing atoms:', error)
    } finally {
      // Clear all loading states after check is complete
      setLoadingRows(new Set())
    }
  }

  // Function to add a new empty row to the CSV data
  const addNewRow = () => {
    setCsvData((prev) => [...prev, Array(prev[0]?.length || 0).fill('')])
  }

  // Function to delete selected rows from the CSV data
  const deleteSelectedRows = () => {
    showConfirmModal(
      `Delete ${selectedRows.length > 1 ? 'selected rows' : 'selected row'}?`,
      (confirm) => {
        if (confirm) {
          setCsvData((prev) => {
            const newData = prev.filter(
              (_, index) => index === 0 || !selectedRows.includes(index - 1),
            )
            // Ensure we always have at least the header row
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

          // Use a callback to ensure we're working with the latest state
          setCsvData((currentCsvData) => {
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

  // Function to publish selected atoms
  const publishAtoms = () => {
    showConfirmModal(
      'Publish selected atoms? This will take about a minute.',
      (confirm) => {
        if (confirm) {
          submit(
            {
              action: 'publishAtoms',
              selectedRows: JSON.stringify(selectedRows),
              csvData: JSON.stringify(csvData),
            },
            { method: 'post' },
          )
        }
      },
    )
  }

  // Function to determine the text for the create/tag atoms button
  const getCreateTagButtonText = useCallback(() => {
    const selectedAtomsExist = selectedRows.every((rowIndex) =>
      existingAtoms.has(rowIndex),
    )
    const selectedAtomsNotExist = selectedRows.every(
      (rowIndex) => !existingAtoms.has(rowIndex),
    )

    if (selectedAtomsExist) return 'Tag Selected Atoms'
    if (selectedAtomsNotExist) return 'Create and Tag Selected Atoms'
    return 'Create / Tag Selected Atoms'
  }, [selectedRows, existingAtoms])

  // Function to handle creating and tagging atoms
  const handleCreateAndTagAtoms = () => {
    showConfirmModal(
      `${getCreateTagButtonText()}?  This will take up to a minute or two.`,
      (confirm) => {
        if (confirm) {
          setIsTagging(true)
          const tag = {
            '@context': newTag['@context'],
            '@type': newTag['@type'],
            name: newTag.name,
            description: newTag.description,
            image: newTag.image,
            url: newTag.url,
          }

          submit(
            {
              action: 'createAndTagAtoms',
              selectedRows: JSON.stringify(selectedRows),
              csvData: JSON.stringify(csvData),
              tag: JSON.stringify(tag),
            },
            { method: 'post' },
          )
        }
      },
    )
  }

  // Effect to reset tagging state when the action is complete
  useEffect(() => {
    if (navigation.state === 'idle' && isTagging) {
      setIsTagging(false)
    }
  }, [navigation.state, isTagging])

  // Function to toggle row selection
  const toggleRowSelection = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
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
      setCsvData((prev) => {
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

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.style.height = '2rem' // Reset to default height
  }

  // Function to search for atoms (currently not implemented)
  const searchAtoms = () => {
    fetcher.load(`/api/csv-editor?action=searchAtoms&query=${searchQuery}`)
  }

  // Function to add an atom to the CSV table
  const addAtomToTable = (atom: string[]) => {
    setCsvData((prev) => [...prev, atom])
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

  // Function to save options (currently not fully implemented)
  const handleSaveOptions = () => {
    console.log('Options saved:', options)
    setShowOptions(false)
  }

  useEffect(() => {
    if (actionData?.requestHash) {
      setCurrentRequestHash(actionData.requestHash)
      setShowProgressModal(true)
    }
  }, [actionData])

  // The main render function, containing the UI structure
  return (
    <>
      {/* Main content */}
      <div className="container mx-auto p-4 space-y-6 relative">
        {/* Button row for main actions */}
        <div className="flex space-x-4">
          <Button onClick={() => fileInputRef.current?.click()}>
            Load CSV
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={loadCSV}
            style={{ display: 'none' }}
            accept=".csv"
          />
          <Button onClick={addNewRow} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Add New Row
          </Button>
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
          <Button
            onClick={publishAtoms}
            disabled={selectedRows.length === 0 || isLoading}
          >
            Publish Atoms
          </Button>
          <Button onClick={saveCSV}>
            <Save className="h-4 w-4" /> Save CSV
          </Button>
        </div>

        {/* Progress bar for loading states */}
        {isLoading && <Progress value={undefined} className="w-full" />}

        {/* CSV data table */}
        {csvData.length > 0 && (
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
                            className="w-full border-none focus:outline-none focus:ring-0 resize-none overflow-hidden h-8"
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
                        onCheckedChange={() => toggleRowSelection(rowIndex - 1)}
                        className="w-4 h-4"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Tag creation section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Create a Tag</h3>
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
            <Button
              onClick={handleCreateAndTagAtoms}
              disabled={
                selectedRows.length === 0 ||
                !newTag.name ||
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
          </div>
        </div>

        {/* Search for Atom section (currently disabled) */}
        <div className="space-y-4 opacity-50 pointer-events-none">
          <h3 className="text-lg font-semibold">Search for Atom</h3>
          <div className="flex space-x-4">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for atoms"
            />
            <Button onClick={searchAtoms}>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
          <p className="text-red-500 font-bold">Under Construction</p>
          {/* ... existing search results table ... */}
        </div>

        {/* LLM Interaction section (currently disabled) */}
        <div className="space-y-2 opacity-50 pointer-events-none">
          <h3 className="text-lg font-semibold">LLM Interaction</h3>
          <Textarea
            value={llmInput}
            onChange={(e) => setLlmInput(e.target.value)}
            placeholder="Enter your message for the LLM"
            rows={4}
          />
          <Button onClick={handleLLMInteraction}>Send to LLM</Button>
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
        isOpen={showProgressModal}
        onClose={() => setShowProgressModal(false)}
        requestHash={currentRequestHash}
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
