import React, { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '../../lib/utils'

interface SpinButtonProps {
  value: string
  onChange: (value: string) => void
  className?: string
  min?: string
  max?: string
  step?: string
}

export function SpinButton({
  value,
  onChange,
  className,
  min,
  max,
  step = '0.1',
  ...props
}: SpinButtonProps) {
  const [isPressed, setIsPressed] = useState<'up' | 'down' | null>(null)
  const rafRef = useRef<number>()
  const lastUpdateRef = useRef<number>(0)

  const updateValue = useCallback(
    (delta: number) => {
      console.log('SpinButton updateValue called:', {
        delta,
        currentValue: value,
        step,
      })
      const currentValue = parseFloat(value) || 0
      const stepValue = parseFloat(step) || 0.1
      const minValue = min ? parseFloat(min) : 0
      const maxValue = max ? parseFloat(max) : Infinity

      const newValue = Math.min(
        Math.max(currentValue + delta * stepValue, minValue),
        maxValue,
      )

      // Format to fixed number of decimals based on step size
      const decimals = Math.max(
        6,
        Math.abs(Math.floor(Math.log10(stepValue))) + 1,
      )
      const formattedValue = newValue.toFixed(decimals)
      console.log('SpinButton new value:', formattedValue)

      // Compare with sufficient precision for the step size
      const diff = Math.abs(newValue - currentValue)
      if (diff >= stepValue / 2) {
        onChange(formattedValue)
      }
    },
    [value, step, min, max, onChange],
  )

  useEffect(() => {
    if (!isPressed) return

    let startTime = performance.now()
    let frameCount = 0

    const animate = (now: number) => {
      if (!isPressed) return

      const delta = isPressed === 'up' ? 1 : -1
      const elapsed = now - startTime

      // Initial press or after 500ms delay, then update every 200ms
      if (
        frameCount === 0 ||
        (elapsed > 500 && now - lastUpdateRef.current > 200)
      ) {
        updateValue(delta)
        lastUpdateRef.current = now
      }

      frameCount++
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isPressed, updateValue])

  return (
    <div className="flex-1 flex">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          const val = e.target.value
          // Only allow numbers and decimals
          if (/^[0-9]*\.?[0-9]*$/.test(val) || val === '') {
            onChange(val)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowUp') {
            e.preventDefault()
            updateValue(1)
          } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            updateValue(-1)
          }
        }}
        className={cn(
          'flex h-10 w-full rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
      <div className="flex flex-col border border-l-0 border-input rounded-r-md overflow-hidden">
        <button
          onMouseDown={() => setIsPressed('up')}
          onMouseUp={() => setIsPressed(null)}
          onMouseLeave={() => setIsPressed(null)}
          onTouchStart={() => setIsPressed('up')}
          onTouchEnd={() => setIsPressed(null)}
          className="flex-1 px-2 hover:bg-accent border-b border-input text-sm"
        >
          ▲
        </button>
        <button
          onMouseDown={() => setIsPressed('down')}
          onMouseUp={() => setIsPressed(null)}
          onMouseLeave={() => setIsPressed(null)}
          onTouchStart={() => setIsPressed('down')}
          onTouchEnd={() => setIsPressed(null)}
          className="flex-1 px-2 hover:bg-accent text-sm"
        >
          ▼
        </button>
      </div>
    </div>
  )
}
