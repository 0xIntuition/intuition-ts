import React, { useEffect, useRef, useState } from 'react'

interface ColorWheelProps {
  value: string // HSL color string
  onChange: (color: string) => void
}

export function ColorWheel({ value, onChange }: ColorWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(100)
  const [lightness, setLightness] = useState(50)

  // Parse initial HSL value
  useEffect(() => {
    const match = value.match(
      /hsl\((\d+\.?\d*)\s+(\d+\.?\d*)%\s+(\d+\.?\d*)%\)/,
    )
    if (match) {
      setHue(parseFloat(match[1]))
      setSaturation(parseFloat(match[2]))
      setLightness(parseFloat(match[3]))
    }
  }, [value])

  const handleColorChange = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2 - 20 // Adjusted for new positioning
    const radius = Math.min(canvas.width, canvas.height - 80) / 2 - 10

    // Check if click is in lightness slider area
    const sliderHeight = 40 // Increased height
    const sliderY = canvas.height - sliderHeight - 20
    if (y >= sliderY && y <= sliderY + sliderHeight) {
      const newLightness = Math.max(
        0,
        Math.min(100, ((x - 20) / (canvas.width - 40)) * 100),
      )
      setLightness(newLightness)
      onChange(`hsl(${hue} ${saturation}% ${newLightness}%)`)
      return
    }

    // Calculate angle and distance for hue/saturation
    const deltaX = x - centerX
    const deltaY = y - centerY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    if (distance <= radius) {
      let angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI
      if (angle < 0) angle += 360

      const newHue = angle
      const newSaturation = Math.min(100, (distance / radius) * 100)

      setHue(newHue)
      setSaturation(newSaturation)
      onChange(`hsl(${newHue} ${newSaturation}% ${lightness}%)`)
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true)
    handleColorChange(e)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      handleColorChange(e)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Draw color wheel
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2 - 20 // Adjusted for new positioning
    const radius = Math.min(width, height - 80) / 2 - 10

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Create image data for pixel-by-pixel manipulation
    const imageData = ctx.createImageData(width, height)
    const data = imageData.data

    // Draw color wheel pixel by pixel
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const dx = x - centerX
        const dy = y - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance <= radius) {
          // Calculate hue and saturation from polar coordinates
          let hue = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360
          let saturation = (distance / radius) * 100

          // Convert HSL to RGB
          const h = hue / 360
          const s = saturation / 100
          const l = 0.5

          let r, g, b

          if (s === 0) {
            r = g = b = l
          } else {
            const hue2rgb = (p: number, q: number, t: number) => {
              if (t < 0) t += 1
              if (t > 1) t -= 1
              if (t < 1 / 6) return p + (q - p) * 6 * t
              if (t < 1 / 2) return q
              if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
              return p
            }

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s
            const p = 2 * l - q

            r = hue2rgb(p, q, h + 1 / 3)
            g = hue2rgb(p, q, h)
            b = hue2rgb(p, q, h - 1 / 3)
          }

          const index = (y * width + x) * 4
          data[index] = Math.round(r * 255)
          data[index + 1] = Math.round(g * 255)
          data[index + 2] = Math.round(b * 255)
          data[index + 3] = 255
        }
      }
    }

    // Put the image data back on the canvas
    ctx.putImageData(imageData, 0, 0)

    // Draw current color marker
    const angle = (hue * Math.PI) / 180
    const distance = (saturation / 100) * radius
    const markerX = centerX + Math.cos(angle) * distance
    const markerY = centerY + Math.sin(angle) * distance

    // Draw marker
    ctx.beginPath()
    ctx.arc(markerX, markerY, 5, 0, Math.PI * 2)
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = 'black'
    ctx.fill()

    // Draw lightness slider
    const sliderHeight = 40 // Increased height
    const sliderY = height - sliderHeight - 20

    const sliderGradient = ctx.createLinearGradient(20, 0, width - 20, 0)
    sliderGradient.addColorStop(0, `hsl(${hue}, ${saturation}%, 0%)`)
    sliderGradient.addColorStop(0.5, `hsl(${hue}, ${saturation}%, 50%)`)
    sliderGradient.addColorStop(1, `hsl(${hue}, ${saturation}%, 100%)`)

    ctx.fillStyle = sliderGradient
    ctx.fillRect(20, sliderY, width - 40, sliderHeight)

    // Draw lightness marker
    const lightnessX = 20 + (width - 40) * (lightness / 100)
    ctx.beginPath()
    ctx.arc(lightnessX, sliderY + sliderHeight / 2, 5, 0, Math.PI * 2)
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = 'black'
    ctx.fill()
  }, [hue, saturation, lightness])

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={340}
      onClick={handleColorChange}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves canvas
      style={{ cursor: 'crosshair', marginTop: '-8px' }}
    />
  )
}
