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
  defaultValue: string
  selectedValue: IdentityInputSelectedValueType
}

const IdentityInputButton = ({
  defaultValue,
  selectedValue,
  ...props
}: IdentityInputButtonProps) => {
  return selectedValue.name ? (
    <IdentityTag size={IdentityTagSize.lg} {...props}>
      {selectedValue.name.toLowerCase()}
    </IdentityTag>
  ) : (
    <Button variant={ButtonVariant.secondary} size={ButtonSize.lg}>
      <Icon name={IconName.plusLarge} className="h-4 w-4" />
      {defaultValue}
    </Button>
  )
}

interface IdentityInputLabelProps {
  label: string
}

const IdentityInputLabel = ({ label }: IdentityInputLabelProps) => (
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
      <TooltipContent>Hello</TooltipContent>
    </Tooltip>
  </div>
)

export interface IdentityInputProps
  extends React.HTMLAttributes<HTMLDivElement> {
  showLabels?: boolean
  primary: {
    label?: string
    defaultValue: string
    selectedValue?: IdentityInputSelectedValueType
    onClick?: () => void
  }
  secondary: {
    label?: string
    defaultValue: string
    selectedValue?: IdentityInputSelectedValueType
    onClick?: () => void
  }
  tertiary: {
    label?: string
    defaultValue: string
    selectedValue?: IdentityInputSelectedValueType
    onClick?: () => void
  }
}

const IdentityInput = ({
  showLabels,
  primary,
  secondary,
  tertiary,
  ...props
}: IdentityInputProps) => {
  const Divider = () => (
    <span className="h-px w-2.5 flex bg-border/30 self-end mb-[1.2rem]" />
  )

  return (
    <TooltipProvider>
      <div className="flex items-center" {...props}>
        <div className="flex flex-col gap-2">
          {showLabels && <IdentityInputLabel label="Subject" />}
          <IdentityInputButton
            defaultValue={primary.defaultValue}
            selectedValue={{
              variant: primary.selectedValue?.variant,
              imgSrc: primary.selectedValue?.imgSrc,
              name: primary.selectedValue?.name,
            }}
          />
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          {showLabels && <IdentityInputLabel label="Predicate" />}
          <IdentityInputButton
            defaultValue={secondary.defaultValue}
            selectedValue={{
              variant: secondary.selectedValue?.variant,
              imgSrc: secondary.selectedValue?.imgSrc,
              name: secondary.selectedValue?.name,
            }}
          />
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          {showLabels && <IdentityInputLabel label="Object" />}
          <IdentityInputButton
            defaultValue={tertiary.defaultValue}
            selectedValue={{
              variant: tertiary.selectedValue?.variant,
              imgSrc: tertiary.selectedValue?.imgSrc,
              name: tertiary.selectedValue?.name,
            }}
          />
        </div>
      </div>
    </TooltipProvider>
  )
}

export { IdentityInput }
