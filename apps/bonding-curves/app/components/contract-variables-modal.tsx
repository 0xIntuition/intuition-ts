import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from '@0xintuition/1ui'

import { formatNumberInput } from '../utils/units'

interface StorageVariable {
  name: string
  type: string
  slot: string
  value: string
  isImmutable?: boolean
}

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

  if (!contract) return null

  const formatVariableValue = (variable: StorageVariable) => {
    // Use edited value if it exists
    if (values[variable.name] !== undefined) {
      return values[variable.name]
    }

    // If this variable maps to a constructor arg, use that value
    if (
      contract.constructorValues &&
      contract.variableToConstructor &&
      contract.variableToConstructor[variable.name]
    ) {
      const constructorValue =
        contract.constructorValues[
          contract.variableToConstructor[variable.name]
        ]
      if (constructorValue !== undefined) {
        return constructorValue
      }
    }

    if (!variable.value) return ''
    if (variable.type === 'string') return variable.value
    if (variable.type.startsWith('uint') || variable.type.startsWith('int')) {
      try {
        return formatNumberInput(BigInt(variable.value))
      } catch (err) {
        console.error('Error formatting number:', err)
        return variable.value
      }
    }
    return variable.value
  }

  const handleChange = (variable: StorageVariable, value: string) => {
    setValues((prev) => ({ ...prev, [variable.name]: value }))
  }

  const handleUpdate = async (variable: StorageVariable) => {
    if (isUpdating) return
    const value = values[variable.name]
    if (value === undefined) return

    setIsUpdating(true)
    try {
      await onVariableChange(variable, value)
      // Clear the edited value after successful update
      setValues((prev) => {
        const next = { ...prev }
        delete next[variable.name]
        return next
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {contract.name} Variables</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {contract.variables.map((variable) => (
            <div key={variable.slot} className="flex flex-col gap-2">
              <Label>
                {variable.name} ({variable.type})
                {variable.isImmutable && (
                  <span className="text-xs text-warning">
                    {' '}
                    (immutable - write with caution)
                  </span>
                )}
              </Label>
              <div className="flex gap-2">
                <Input
                  value={formatVariableValue(variable)}
                  onChange={(e) => handleChange(variable, e.target.value)}
                  placeholder={variable.type}
                />
                <Button
                  onClick={() => handleUpdate(variable)}
                  disabled={isUpdating || values[variable.name] === undefined}
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
