'use client'

import { useState } from 'react'

import type { ConstructorArg } from '../lib/contract-utils'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from './ui/ui-components'

interface ConstructorFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: Record<string, string>) => void
  args: ConstructorArg[]
  fileName: string
}

export function ConstructorForm({
  isOpen,
  onClose,
  onSubmit,
  args,
  fileName,
}: ConstructorFormProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    args.reduce((acc, arg) => ({ ...acc, [arg.name]: '' }), {}),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(values)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Constructor Arguments</DialogTitle>
          <DialogDescription>
            {args.length === 0
              ? `No constructor arguments required for ${fileName}`
              : `Enter the constructor arguments for ${fileName}`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {args.map((arg) => (
            <div key={arg.name} className="space-y-2">
              <Label htmlFor={arg.name}>
                {arg.name} ({arg.type})
              </Label>
              <Input
                id={arg.name}
                value={values[arg.name]}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    [arg.name]: e.target.value,
                  }))
                }
                placeholder={`Enter ${arg.name}`}
                required
              />
            </div>
          ))}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Deploy</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
