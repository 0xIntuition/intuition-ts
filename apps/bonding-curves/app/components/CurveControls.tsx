import { useState } from 'react'

export interface CurveParameters {
  curveType: 'linear' | 'logarithmic'
  scale?: number
  offset?: number
  maxAssets?: number
}

interface CurveControlsProps {
  onParametersChange: (params: CurveParameters) => void
}

export function CurveControls({ onParametersChange }: CurveControlsProps) {
  const [parameters, setParameters] = useState<CurveParameters>({
    curveType: 'linear',
    scale: 2e18,
    offset: 1,
    maxAssets: 1000,
  })

  const handleChange = (
    field: keyof CurveParameters,
    value: string | number,
  ) => {
    const newParameters = {
      ...parameters,
      [field]: field === 'curveType' ? value : Number(value),
    }
    setParameters(newParameters)
    onParametersChange(newParameters)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Curve Type
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={parameters.curveType}
          onChange={(e) => handleChange('curveType', e.target.value)}
        >
          <option value="linear">Linear</option>
          <option value="logarithmic">Logarithmic</option>
        </select>
      </div>

      {parameters.curveType === 'logarithmic' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scale (Curve Gentleness)
            </label>
            <input
              type="number"
              min="1"
              step="1e17"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={parameters.scale}
              onChange={(e) => handleChange('scale', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Offset (Initial Gentleness)
            </label>
            <input
              type="number"
              min="1"
              step="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={parameters.offset}
              onChange={(e) => handleChange('offset', e.target.value)}
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Max Assets
        </label>
        <input
          type="number"
          min="0"
          step="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={parameters.maxAssets}
          onChange={(e) => handleChange('maxAssets', e.target.value)}
        />
      </div>
    </div>
  )
}
