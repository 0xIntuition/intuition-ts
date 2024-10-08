import { useEffect, useRef } from 'react'

import { Input, Text } from '@0xintuition/1ui'

import ErrorList from '../error-list'

interface StakeInputProps {
  val: string
  setVal: (value: string) => void
  wallet: string
  isLoading: boolean
  showErrors: boolean
  setShowErrors: (show: boolean) => void
  validationErrors: string[]
  setValidationErrors: (errors: string[]) => void
}

export default function StakeInput({
  val,
  setVal,
  wallet,
  isLoading,
  showErrors,
  setShowErrors,
  validationErrors,
  setValidationErrors,
}: StakeInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current !== null && inputRef.current !== undefined) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="flex w-full max-w-md flex-col pt-5 mx-auto">
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
          className="text-6xl h-14 font-semibold text-neutral-50 [&>input]:text-center bg-transparent border-none"
          disabled={isLoading || !wallet || wallet === ''}
        />
        <Text
          weight="medium"
          className="text-center text-secondary-foreground leading-normal pt-2.5"
        >
          ETH
        </Text>
        <div className={`h-2 px-2 ${!showErrors && 'invisible'}`}>
          <ErrorList errors={validationErrors} />
        </div>
      </div>
    </div>
  )
}
