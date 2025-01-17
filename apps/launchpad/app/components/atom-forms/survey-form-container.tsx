import { useState } from 'react'

import { Button, ButtonSize, Icon, IconName } from '@0xintuition/1ui'

import { Link } from '@remix-run/react'
import { Book } from 'lucide-react'

import { getAtomForm } from './registry'
import { Atom } from './types'

interface SurveyFormContainerProps {
  onSubmit: (data: Atom) => Promise<void>
  isLoading?: boolean
  defaultValues?: Partial<Atom>
}

export function SurveyFormContainer({
  onSubmit,
  isLoading,
  defaultValues,
}: SurveyFormContainerProps) {
  const [selectedType] = useState<Atom['type']>('Thing')

  const formConfig = getAtomForm('Thing')
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
            <h2 className="text-xl font-semibold">Publish Web3 Wallet Atom</h2>
            <div className="flex flex-row gap-1 text-sm text-muted-foreground items-center">
              <Book className="h-4 w-4 text-primary/70" />
              Fill out the form to publish the atom metadata to IPFS. Learn more
              in our{' '}
              <Link
                to="https://tech.docs.intuition.systems/primitives-atom"
                target="_blank"
                rel="noreferrer"
                className="text-primary font-semibold hover:text-accent"
              >
                documentation
              </Link>
            </div>
          </div>
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
              <Icon
                name={IconName.inProgress}
                className="h-4 w-4 animate-spin"
              />
            )}
            {isLoading ? 'Publishing...' : `Publish to IPFS`}
          </Button>
        </div>
      </div>
    </div>
  )
}
