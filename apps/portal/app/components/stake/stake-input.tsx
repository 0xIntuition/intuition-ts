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
    <div className="flex flex-row items-center">
      <div className="flex w-full flex-col pb-8 pt-2">
        <div className="flex flex-row items-center overflow-hidden text-center">
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
            className="rounded-none border-none py-2 text-5xl font-medium text-foreground focus:outline-none focus:ring-0 bg-transparent"
            disabled={isLoading || !wallet || wallet === ''}
          />
          <span
            className={`flex items-center py-2 text-5xl font-medium text-gray-300 ${
              val !== '' && '!text-foreground'
            }
            }`}
          >
            ETH
          </span>
        </div>
        <div className={`h-2 px-2 ${!showErrors && 'invisible'}`}>
          <ErrorList errors={validationErrors} />
        </div>
      </div>
    </div>
  )
}
