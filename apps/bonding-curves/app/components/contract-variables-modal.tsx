import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Text,
} from '@0xintuition/1ui'

import { type StorageVariable } from '../lib/contract-utils'
import { formatNumberInput } from '../utils/units'

interface ContractInfo {
  address: string
  name: string
  variables: StorageVariable[]
  constructorValues?: Record<string, string>
  variableToConstructor?: Record<string, string>
}

interface ContractVariablesModalProps {
  isOpen: boolean
  onClose: () => void
  contract: ContractInfo | null
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

  const handleChange = (variable: StorageVariable, value: string) => {
    setValues((prev) => ({ ...prev, [variable.name]: value }))
  }

  const handleUpdate = async (variable: StorageVariable) => {
    const value = values[variable.name]
    if (value === undefined) return

    setIsUpdating(true)
    try {
      await onVariableChange(variable, value)
      setValues((prev) => ({ ...prev, [variable.name]: '' }))
    } finally {
      setIsUpdating(false)
    }
  }

  const formatVariableValue = (variable: StorageVariable) => {
    const value = values[variable.name]
    if (value !== undefined) return value
    return variable.value?.toString() || ''
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Contract Variables</DialogTitle>
          <DialogDescription>
            {contract?.name} ({contract?.address})
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {contract?.variables.map((variable) => (
            <div key={variable.name} className="flex flex-col gap-2">
              <Label>{variable.name}</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={formatVariableValue(variable)}
                  onChange={(e) => handleChange(variable, e.target.value)}
                  disabled={variable.isImmutable}
                />
                <Button
                  onClick={() => handleUpdate(variable)}
                  disabled={
                    variable.isImmutable || values[variable.name] === undefined
                  }
                >
                  Update
                </Button>
              </div>
              <Text variant="small" className="text-muted-foreground">
                Type: {variable.type}, Slot: {variable.slot}
              </Text>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
