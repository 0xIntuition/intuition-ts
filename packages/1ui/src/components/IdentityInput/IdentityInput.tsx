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
  subject: {
    label: string
    defaultValue: string
    selectedValue?: IdentityInputSelectedValueType
    onClick?: () => void
  }
}

const IdentityInput = ({ subject, ...props }: IdentityInputProps) => {
  const Divider = () => (
    <span className="h-px w-2.5 flex bg-border/30 self-end mb-[1.2rem]" />
  )

  return (
    <TooltipProvider>
      <div className="flex items-center" {...props}>
        <div className="flex flex-col gap-2">
          {subject.label && <IdentityInputLabel label={subject.label} />}
          <IdentityInputButton
            defaultValue={subject.defaultValue}
            selectedValue={{
              variant: subject.selectedValue?.variant,
              imgSrc: subject.selectedValue?.imgSrc,
              name: subject.selectedValue?.name,
            }}
          />
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          {subject.label && <IdentityInputLabel label={subject.label} />}
          <IdentityInputButton
            defaultValue={subject.defaultValue}
            selectedValue={{
              variant: subject.selectedValue?.variant,
              imgSrc: subject.selectedValue?.imgSrc,
              name: subject.selectedValue?.name,
            }}
          />
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          {subject.label && <IdentityInputLabel label={subject.label} />}
          <IdentityInputButton
            defaultValue={subject.defaultValue}
            selectedValue={{
              variant: subject.selectedValue?.variant,
              imgSrc: subject.selectedValue?.imgSrc,
              name: subject.selectedValue?.name,
            }}
          />
        </div>
      </div>
    </TooltipProvider>
  )
}

export { IdentityInput }
