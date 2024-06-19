import path from 'path'
import { useState } from 'react'

import { SegmentedControl, SegmentedControlItem } from '@0xintuition/1ui'

import logger from '@lib/utils/logger'
import { useNavigate, useParams } from '@remix-run/react'

export interface OptionType {
  value: string
  path: string
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
    const basePath = '/app/profile'
    const fullPath = wallet
      ? `${basePath}/${wallet}${option.value !== 'overview' ? '/' + option.value : ''}`
      : `${basePath}${option.value !== 'overview' ? '/' + option.value : ''}`
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
