import { useEffect, useRef } from 'react'

import { Input } from '@0xintuition/1ui'

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
      <div className="flex w-full max-w-md flex-col pt-4 mx-auto">
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
              inputValue = '0' + inputValue
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
          className="text-5xl h-14 font-semibold text-neutral-50 bg-transparent text-center mx-auto !outline-none !ring-0 !border-none !focus:ring-0 !focus:outline-none !focus:border-none !focus-visible:outline-none leading-none py-3 items-center"
          disabled={isLoading || !wallet || wallet === ''}
        />
        <div className="text-center text-white/50 text-base font-medium leading-normal pt-3">
          ETH
        </div>
        <div className={`h-2 px-2 ${!showErrors && 'invisible'}`}>
          <ErrorList errors={validationErrors} />
        </div>
      </div>
    </div>
  )
}
