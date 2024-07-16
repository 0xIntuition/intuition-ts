import React from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
  IdentityTag,
  IdentityTagSize,
  IdentityType,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  TextVariant,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'

type IdentityInputSelectedValueType = {
  variant?: IdentityType
  imgSrc?: string | null
  name?: string
}

interface IdentityInputButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder: string
  selectedValue: IdentityInputSelectedValueType
  onOpen?: () => void
  isPopoverOpen: boolean
  identities: IdentityPresenter[]
  onIdentitySelect: (identity: IdentityPresenter) => void
}

const IdentityInputButton = ({
  placeholder,
  selectedValue,
  onOpen,
  isPopoverOpen,
  identities,
  onIdentitySelect,
  ...props
}: IdentityInputButtonProps) => {
  return (
    <Popover open={isPopoverOpen} onOpenChange={onOpen}>
      <PopoverTrigger asChild>
        {selectedValue.name ? (
          <IdentityTag
            size={IdentityTagSize.lg}
            variant={selectedValue.variant}
            {...props}
          >
            {selectedValue.name.toLowerCase()}
          </IdentityTag>
        ) : (
          <Button variant={ButtonVariant.secondary} size={ButtonSize.lg}>
            <Icon name={IconName.plusLarge} className="h-4 w-4" />
            {placeholder}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="bg-transparent">
        <IdentitySearchCombobox
          identities={identities}
          onIdentitySelect={onIdentitySelect}
          shouldFilter={false}
        />
      </PopoverContent>
    </Popover>
  )
}

interface IdentityInputLabelProps {
  label: string
  tooltipContent: string
}

const IdentityInputLabel = ({
  label,
  tooltipContent,
}: IdentityInputLabelProps) => (
  <div className="flex gap-1 items-center">
    <Text variant={TextVariant.small} className="text-primary/60">
      {label}
    </Text>
    <Tooltip>
      <TooltipTrigger>
        <Icon
          name={IconName.circleQuestionMark}
          className="h-4 w-4 text-primary/60"
        />
      </TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  </div>
)

export interface IdentityInputProps
  extends React.HTMLAttributes<HTMLDivElement> {
  showLabels?: boolean
  subject: {
    placeholder?: string
    selectedValue?: IdentityInputSelectedValueType
    onClick?: () => void
    isPopoverOpen: boolean
    identities: IdentityPresenter[]
    onIdentitySelect: (identity: IdentityPresenter) => void
  }
  predicate: {
    placeholder?: string
    selectedValue?: IdentityInputSelectedValueType
    onClick?: () => void
    isPopoverOpen: boolean
    identities: IdentityPresenter[]
    onIdentitySelect: (identity: IdentityPresenter) => void
  }
  object: {
    placeholder?: string
    selectedValue?: IdentityInputSelectedValueType
    onClick?: () => void
    isPopoverOpen: boolean
    identities: IdentityPresenter[]
    onIdentitySelect: (identity: IdentityPresenter) => void
  }
}

const IdentityInput = ({
  showLabels,
  subject,
  predicate,
  object,
  ...props
}: IdentityInputProps) => {
  const Divider = () => (
    <span className="h-px w-2.5 flex bg-border/30 self-end mb-[1.2rem]" />
  )

  return (
    <TooltipProvider>
      <div className="flex items-center" {...props}>
        <div className="flex flex-col gap-2">
          {showLabels && (
            <IdentityInputLabel
              label="Subject"
              tooltipContent="Select an identity as a subject"
            />
          )}
          <IdentityInputButton
            placeholder={subject.placeholder || 'Add a subject'}
            selectedValue={{
              variant: subject.selectedValue?.variant,
              imgSrc: subject.selectedValue?.imgSrc,
              name: subject.selectedValue?.name,
            }}
            onOpen={subject.onClick}
            isPopoverOpen={subject.isPopoverOpen}
            identities={subject.identities}
            onIdentitySelect={subject.onIdentitySelect}
          />
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          {showLabels && (
            <IdentityInputLabel
              label="Predicate"
              tooltipContent="Select an identity as a predicate"
            />
          )}
          <IdentityInputButton
            placeholder={predicate.placeholder || 'Add a predicate'}
            selectedValue={{
              variant: predicate.selectedValue?.variant,
              imgSrc: predicate.selectedValue?.imgSrc,
              name: predicate.selectedValue?.name,
            }}
            onOpen={predicate.onClick}
            isPopoverOpen={predicate.isPopoverOpen}
            identities={predicate.identities}
            onIdentitySelect={predicate.onIdentitySelect}
          />
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          {showLabels && (
            <IdentityInputLabel
              label="Object"
              tooltipContent="Select an identity as an object"
            />
          )}
          <IdentityInputButton
            placeholder={object.placeholder || 'Add an object'}
            selectedValue={{
              variant: object.selectedValue?.variant,
              imgSrc: object.selectedValue?.imgSrc,
              name: object.selectedValue?.name,
            }}
            onOpen={object.onClick}
            isPopoverOpen={object.isPopoverOpen}
            identities={object.identities}
            onIdentitySelect={object.onIdentitySelect}
          />
        </div>
      </div>
    </TooltipProvider>
  )
}

export { IdentityInput }
