import * as React from 'react'
import { useState } from 'react'

import { Button, ButtonSize } from '@0xintuition/1ui'

import { AtomTypeSelect } from './atom-type-select'
import { getAtomForm } from './registry'
import { Atom } from './types'

interface FormContainerProps {
  onSubmit: (data: Atom) => Promise<void>
}

export function FormContainer({ onSubmit }: FormContainerProps) {
  const [selectedType, setSelectedType] = useState<Atom['type']>('Person')

  const formConfig = getAtomForm(selectedType)
  if (!formConfig) return null

  const FormComponent = formConfig.component

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg max-w-xl w-full p-6">
        <div className="space-y-6">
          {/* Header with Type Selector */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Create</h2>
            <AtomTypeSelect
              value={selectedType}
              onValueChange={setSelectedType}
            />
          </div>

          {/* Form Content */}
          <div className="space-y-4">
            <FormComponent onSubmit={onSubmit} />
          </div>

          {/* Separator */}
          <div className="h-px bg-primary/10" />

          {/* Footer */}
          <div className="flex justify-end">
            <Button
              size={ButtonSize.md}
              type="submit"
              form={`${selectedType.toLowerCase()}-form`}
            >
              Create {selectedType}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
