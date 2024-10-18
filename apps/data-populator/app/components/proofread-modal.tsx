import React, { useEffect, useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
} from '@0xintuition/1ui'

import { ScrollArea } from '@components/ui/scroll-area'

interface ProofreadModalProps {
  isOpen: boolean
  onClose: () => void
  issues: UnusualCharacterIssue[]
  onApplyFixes: (updatedIssues: UnusualCharacterIssue[]) => void
}

interface UnusualCharacterIssue {
  rowIndex: number
  cellIndex: number
  originalValue: string
  suggestedValue: string
  reason: string
}

function DiffHighlight({
  original,
  suggested,
}: {
  original: string
  suggested: string
}) {
  const diff = original.split('').map((char, index) => {
    if (char !== suggested[index]) {
      return (
        <span
          key={index}
          className="bg-red-500 text-white dark:bg-red-700 dark:text-white"
        >
          {char}
        </span>
      )
    }
    return char
  })

  return <>{diff}</>
}

export function ProofreadModal({
  isOpen,
  onClose,
  issues,
  onApplyFixes,
}: ProofreadModalProps) {
  const [editableIssues, setEditableIssues] = useState<UnusualCharacterIssue[]>(
    [],
  )

  useEffect(() => {
    setEditableIssues(issues)
  }, [issues])

  const handleSuggestedValueChange = (index: number, newValue: string) => {
    const updatedIssues = [...editableIssues]
    updatedIssues[index] = { ...updatedIssues[index], suggestedValue: newValue }
    setEditableIssues(updatedIssues)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Unusual Characters Detected</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex-grow overflow-hidden">
          <p className="mb-4">
            The following unusual characters were detected in your CSV. You can
            review and modify the suggested fixes before applying them.
          </p>
          <ScrollArea className="h-[calc(100vh-300px)] w-full rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Row</TableHead>
                  <TableHead className="w-16">Column</TableHead>
                  <TableHead className="w-1/3">Original Value</TableHead>
                  <TableHead className="w-1/3">Suggested Value</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {editableIssues.map((issue, index) => (
                  <TableRow key={index}>
                    <TableCell>{issue.rowIndex + 1}</TableCell>
                    <TableCell>{issue.cellIndex + 1}</TableCell>
                    <TableCell className="whitespace-pre-wrap break-words">
                      <DiffHighlight
                        original={issue.originalValue}
                        suggested={issue.suggestedValue}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={issue.suggestedValue}
                        onChange={(e) =>
                          handleSuggestedValueChange(index, e.target.value)
                        }
                        className="w-full h-full min-h-[100px] whitespace-pre-wrap"
                      />
                    </TableCell>
                    <TableCell>{issue.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
        <DialogFooter className="mt-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => onApplyFixes(editableIssues)}>
            Apply Fixes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
