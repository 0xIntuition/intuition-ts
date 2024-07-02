import * as React from 'react'

import { IdentityType } from 'types'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
  IdentityTag,
  IdentityTagSize,
  Text,
  TextVariant,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '..'

type IdentityInputSelectedValueType = {
  variant?: IdentityType
  imgSrc?: string
  name?: string
}

interface IdentityInputButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder: string
  selectedValue: IdentityInputSelectedValueType
}

const IdentityInputButton = ({
  placeholder,
  selectedValue,
  ...props
}: IdentityInputButtonProps) => {
  return selectedValue.name ? (
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
  }
  predicate: {
    placeholder?: string
    selectedValue?: IdentityInputSelectedValueType
    onClick?: () => void
  }
  object: {
    placeholder?: string
    selectedValue?: IdentityInputSelectedValueType
    onClick?: () => void
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
            onClick={subject.onClick}
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
            onClick={predicate.onClick}
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
            onClick={object.onClick}
          />
        </div>
      </div>
    </TooltipProvider>
  )
}

export { IdentityInput }
