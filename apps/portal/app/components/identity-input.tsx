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
  Trunctacular,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import { useIdentityServerSearch } from '@lib/hooks/useIdentityServerSearch'

type IdentityInputSelectedValueType = {
  variant?: IdentityType
  imgSrc?: string | null
  name?: string
}

export interface IdentityInputButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder: string
  label: string
  selectedValue: IdentityInputSelectedValueType
  isPopoverOpen: boolean
  onClick?: () => void
  identities: IdentityPresenter[]
  onIdentitySelect: (identity: IdentityPresenter) => void
}

const IdentityInputButton = ({
  placeholder,
  selectedValue,
  isPopoverOpen,
  onClick,
  identities,
  onIdentitySelect,
  ...props
}: IdentityInputButtonProps) => {
  const {
    setSearchQuery,
    identities: filteredIdentities,
    handleInput,
  } = useIdentityServerSearch()

  const identitiesToList = filteredIdentities.length
    ? filteredIdentities
    : identities

  return (
    <div className="flex flex-col gap-2 items-start">
      <Popover open={isPopoverOpen} onOpenChange={onClick}>
        <PopoverTrigger>
          {selectedValue.name ? (
            <IdentityTag
              size={IdentityTagSize.lg}
              variant={selectedValue.variant}
              className="min-w-32"
              {...props}
            >
              <Trunctacular value={selectedValue.name.toLowerCase()} />
            </IdentityTag>
          ) : (
            <Button
              variant={ButtonVariant.secondary}
              size={ButtonSize.lg}
              {...props}
            >
              <Icon name={IconName.plusLarge} className="h-4 w-4" />
              {placeholder}
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="bg-transparent border-0 w-max p-0">
          <IdentitySearchCombobox
            identities={identitiesToList}
            onIdentitySelect={onIdentitySelect}
            onValueChange={setSearchQuery}
            onInput={handleInput}
            shouldFilter={false}
          />
        </PopoverContent>
      </Popover>
    </div>
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
  subject: IdentityInputButtonProps
  predicate: IdentityInputButtonProps
  object: IdentityInputButtonProps
}

const IdentityInput = ({
  showLabels,
  subject,
  predicate,
  object,
  ...props
}: IdentityInputProps) => {
  const Divider = () => (
    <span className="h-px w-2.5 flex bg-border/30 self-end mb-[1.2rem] max-md:hidden" />
  )

  const renderIdentityInput = (inputProps: IdentityInputButtonProps) => (
    <div className="flex flex-col gap-2">
      {showLabels && (
        <IdentityInputLabel
          label={inputProps.label}
          tooltipContent={`Select an identity as a ${inputProps.label.toLowerCase()}`}
        />
      )}
      <IdentityInputButton {...inputProps} />
    </div>
  )

  return (
    <TooltipProvider>
      <div
        className="flex justify-center items-center w-fit m-auto theme-border rounded-lg p-4 max-md:flex-col max-md:items-center max-md:gap-2"
        {...props}
      >
        {renderIdentityInput(subject)}
        <Divider />
        {renderIdentityInput(predicate)}
        <Divider />
        {renderIdentityInput(object)}
      </div>
    </TooltipProvider>
  )
}

export { IdentityInput }
