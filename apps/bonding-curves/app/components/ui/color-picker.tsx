'use client'

import { useState } from 'react'

import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui-components'

interface ColorPickerProps {
  isOpen: boolean
  onClose: () => void
  onColorSelect: (color: string) => void
  currentColor: string
}

const PRESET_COLORS = [
  { name: 'Primary Blue', value: 'hsl(221.2 83.2% 53.3%)' },
  { name: 'Forest Green', value: 'hsl(142.1 76.2% 36.3%)' },
  { name: 'Rose Red', value: 'hsl(346.8 77.2% 49.8%)' },
  { name: 'Golden Yellow', value: 'hsl(43.3 96.4% 56.3%)' },
  { name: 'Royal Purple', value: 'hsl(262.1 83.3% 57.8%)' },
  { name: 'Burnt Orange', value: 'hsl(20.5 90.2% 48.2%)' },
  { name: 'Turquoise', value: 'hsl(189.5 94.5% 42.7%)' },
  { name: 'Magenta', value: 'hsl(283.4 67.1% 50.4%)' },
]

export function ColorPicker({
  isOpen,
  onClose,
  onColorSelect,
  currentColor,
}: ColorPickerProps) {
  const [customColor, setCustomColor] = useState(currentColor)

  const handleColorSelect = (color: string) => {
    onColorSelect(color)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Curve Color</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-4 gap-2">
            {PRESET_COLORS.map((color, index) => (
              <button
                key={index}
                className="w-12 h-12 rounded-md border border-border hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                style={{ backgroundColor: color.value }}
                onClick={() => handleColorSelect(color.value)}
                title={color.name}
              />
            ))}
          </div>
          <div className="space-y-2">
            <Label>Custom Color</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                placeholder="Enter HSL or hex color"
              />
              <div
                className="w-10 h-10 rounded-md border border-border"
                style={{ backgroundColor: customColor }}
              />
            </div>
            <Button
              onClick={() => handleColorSelect(customColor)}
              className="w-full"
            >
              Apply Custom Color
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
