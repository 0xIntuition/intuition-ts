import { useState } from 'react'

import { SegmentedControl, SegmentedControlItem } from '@0xintuition/1ui'

import { useNavigate, useParams } from '@remix-run/react'

export interface OptionType {
  value: string
  path?: string
  basePath?: string
  label: string
}

interface SegmentedNavProps {
  options: OptionType[]
}

export const SegmentedNav = ({ options }: SegmentedNavProps) => {
  const [selectedTab, setSelectedTab] = useState(options[0].value)
  const navigate = useNavigate()
  const params = useParams()

  const handleTabClick = (option: OptionType) => {
    setSelectedTab(option.value)
    const wallet = params.wallet || null
    let fullPath

    if (option.path) {
      fullPath = option.path
    } else if (option.basePath) {
      fullPath = `${option.basePath}${wallet ? '/' + wallet : ''}${option.value !== 'overview' ? '/' + option.value : ''}`
    } else {
      const basePath = '/app/profile'
      fullPath = wallet
        ? `${basePath}/${wallet}${option.value !== 'overview' ? '/' + option.value : ''}`
        : `${basePath}${option.value !== 'overview' ? '/' + option.value : ''}`
    }

    navigate(fullPath)
  }

  return (
    <SegmentedControl className="w-fit">
      {options.map((option, index) => (
        <SegmentedControlItem
          key={index}
          isActive={selectedTab === option.value}
          onClick={() => handleTabClick(option)}
        >
          {option.label}
        </SegmentedControlItem>
      ))}
    </SegmentedControl>
  )
}
