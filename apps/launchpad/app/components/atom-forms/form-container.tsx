import { useState } from 'react'

import { Button, ButtonSize, Icon, IconName } from '@0xintuition/1ui'

import { AtomTypeSelect } from './atom-type-select'
import { getAtomForm } from './registry'
import { Atom } from './types'

interface FormContainerProps {
  onSubmit: (data: Atom) => Promise<void>
  isLoading?: boolean
  defaultValues?: Partial<Atom>
}

export function FormContainer({
  onSubmit,
  isLoading,
  defaultValues,
}: FormContainerProps) {
  const [selectedType, setSelectedType] = useState<Atom['type']>('Thing')

  const formConfig = getAtomForm(selectedType)
  if (!formConfig) {
    return null
  }

  const FormComponent = formConfig.component

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Header with Type Selector */}
        <div className="flex items-start justify-between gap-4 pb-5">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Publish Atom Data</h2>
            <div className="text-sm text-muted-foreground">
              Select the type of atom and fill out the form to publish your atom
              metadata to IPFS.
            </div>
          </div>
          <AtomTypeSelect
            value={selectedType}
            onValueChange={setSelectedType}
          />
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-1">
          <div className="space-y-2.5">
            <FormComponent onSubmit={onSubmit} defaultValues={defaultValues} />
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="pt-5 border-t border-primary/5">
        <div className="flex justify-end">
          <Button
            size={ButtonSize.md}
            type="submit"
            form={`${selectedType.toLowerCase()}-form`}
            disabled={!!isLoading}
          >
            {isLoading && (
              <Icon name={IconName.inProgress} className="animate-spin" />
            )}
            {isLoading ? 'Creating...' : `Create ${selectedType}`}
          </Button>
        </div>
      </div>
    </div>
  )
}
