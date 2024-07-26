import { useEffect, useRef } from 'react'

import {
  Badge,
  Icon,
  IconName,
  Input,
  Text,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@0xintuition/1ui'

import ErrorList from '../error-list'

interface CreateClaimInputProps {
  val: string
  setVal: (value: string) => void
  wallet: string
  walletBalance: string
  isLoading?: boolean
  showErrors?: boolean
  setShowErrors: (show: boolean) => void
  validationErrors?: string[]
  setValidationErrors: (errors: string[]) => void
}

export default function CreateClaimInput({
  val,
  setVal,
  wallet,
  walletBalance,
  isLoading,
  showErrors,
  setShowErrors,
  validationErrors,
  setValidationErrors,
}: CreateClaimInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current !== null && inputRef.current !== undefined) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="flex w-full max-w-md flex-col mx-auto">
        <div className="flex flex-row items-center justify-between mb-1">
          <div className="inline-flex gap-1">
            <Text variant="caption" className="text-secondary-foreground/90">
              Initial Deposit
            </Text>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Icon
                    name={IconName.circleQuestionMark}
                    className="text-secondary-foreground/90 h-4 w-4"
                  />
                </TooltipTrigger>
                <TooltipContent className="max-w-60">
                  No initial deposit is required to create a claim. However, you
                  will need to spend small amount of ETH to cover the fees.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Badge className="bg-transparent">
            <Icon name="wallet" className="h-4 w-4" />
            {(+walletBalance).toFixed(2)} ETH
          </Badge>
        </div>
        <Input
          ref={inputRef}
          id="position"
          autoComplete="off"
          type="text"
          value={val}
          onChange={(e) => {
            e.preventDefault()
            let inputValue = e.target.value
            if (inputValue.startsWith('.')) {
              inputValue = `0${inputValue}`
            }
            const sanitizedValue = inputValue.replace(/[^0-9.]/g, '')
            if (sanitizedValue.split('.').length > 2) {
              return
            }
            setVal(sanitizedValue)
            setShowErrors(false)
            setValidationErrors([])
          }}
          min={'0'}
          placeholder={'0'}
          disabled={isLoading || !wallet || wallet === ''}
          startAdornment="ETH"
        />
        <div className={`h-2 px-2 ${!showErrors && 'invisible'}`}>
          <ErrorList errors={validationErrors} />
        </div>
      </div>
    </div>
  )
}
