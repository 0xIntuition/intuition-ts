'use client'

import React, { useState } from 'react'

import { ColorWheel } from './color-wheel'
import { Dialog, DialogContent } from './dialog'

interface ColorPickerProps {
  isOpen: boolean
  onClose: () => void
  onColorSelect: (color: string) => void
  currentColor: string
}

export function ColorPicker({
  isOpen,
  onClose,
  onColorSelect,
  currentColor,
}: ColorPickerProps) {
  const [customColor, setCustomColor] = useState(currentColor)
  const [showColorWheel, setShowColorWheel] = useState(false)

  const presetColors = [
    'hsl(221.2 83.2% 53.3%)', // Primary blue
    'hsl(142.1 76.2% 36.3%)', // Forest green
    'hsl(346.8 77.2% 49.8%)', // Rose red
    'hsl(43.3 96.4% 56.3%)', // Golden yellow
    'hsl(262.1 83.3% 57.8%)', // Royal purple
    'hsl(20.5 90.2% 48.2%)', // Burnt orange
    'hsl(189.5 94.5% 42.7%)', // Turquoise
    'hsl(283.4 67.1% 50.4%)', // Magenta
  ]

  const handleColorSelect = (color: string) => {
    onColorSelect(color)
    onClose()
  }

  const handleCustomColorClick = () => {
    setShowColorWheel(true)
  }

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color)
  }

  const handleApplyCustomColor = () => {
    onColorSelect(customColor)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4">
          <div className="text-lg font-semibold">Select Curve Color</div>
          <div className="grid grid-cols-4 gap-2">
            {presetColors.map((color) => (
              <button
                key={color}
                className="h-12 w-12 rounded-lg border border-border transition-colors hover:border-primary"
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>
          <div>
            <div className="mb-2 text-sm font-medium">Custom Color</div>
            {showColorWheel ? (
              <div className="flex flex-col items-center gap-4">
                <ColorWheel
                  value={customColor}
                  onChange={handleCustomColorChange}
                />
                <div className="flex w-full items-center gap-2">
                  <div
                    className="h-8 w-8 rounded border border-border"
                    style={{ backgroundColor: customColor }}
                  />
                  <input
                    type="text"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="flex-1 rounded-md border border-border bg-background px-3 py-1 text-sm"
                  />
                </div>
                <button
                  className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  onClick={handleApplyCustomColor}
                >
                  Apply Custom Color
                </button>
              </div>
            ) : (
              <button
                className="h-12 w-full rounded-lg border border-border transition-colors hover:border-primary"
                style={{ backgroundColor: customColor }}
                onClick={handleCustomColorClick}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
