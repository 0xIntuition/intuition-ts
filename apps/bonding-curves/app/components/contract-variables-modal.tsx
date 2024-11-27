import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
  Text,
} from '@0xintuition/1ui'

import { type Address } from 'viem'

import type { StorageVariable } from '../lib/contract-utils'

interface ContractVariablesModalProps {
  isOpen: boolean
  onClose: () => void
  contract: {
    address: Address
    name: string
    variables: StorageVariable[]
  } | null
  onVariableChange: (
    variable: StorageVariable,
    newValue: string,
  ) => Promise<void>
}

export function ContractVariablesModal({
  isOpen,
  onClose,
  contract,
  onVariableChange,
}: ContractVariablesModalProps) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [isUpdating, setIsUpdating] = useState(false)

  if (!contract) return null

  const handleChange = async (variable: StorageVariable, value: string) => {
    console.log('handleChange called with:', variable.name, value)
    setValues((prev) => ({ ...prev, [variable.name]: value }))
  }

  const handleSave = async (variable: StorageVariable) => {
    console.log('handleSave called with:', variable.name)
    const value = values[variable.name] ?? variable.value?.toString() ?? ''
    console.log('value to save:', value)
    if (!value) return

    setIsUpdating(true)
    try {
      console.log('calling onVariableChange with:', variable.name, value)
      await onVariableChange(variable, value)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{contract.name} Variables</DialogTitle>
          <DialogDescription>
            Edit contract storage variables. Note: Writing to immutable
            variables may not work as expected.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {contract.variables.map((variable) => (
            <div
              key={variable.name}
              className="grid grid-cols-4 items-center gap-4"
            >
              <label className="text-right">
                {variable.name}
                {variable.isImmutable && (
                  <span className="text-xs text-warning">
                    {' '}
                    (immutable - write with caution)
                  </span>
                )}
              </label>
              <div className="col-span-3 flex gap-2">
                <Input
                  disabled={isUpdating}
                  value={
                    values[variable.name] ?? variable.value?.toString() ?? ''
                  }
                  onChange={(e) => handleChange(variable, e.target.value)}
                  placeholder={variable.type}
                />
                <Button
                  disabled={isUpdating}
                  onClick={() => handleSave(variable)}
                  variant={variable.isImmutable ? 'destructive' : 'default'}
                >
                  Update
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
