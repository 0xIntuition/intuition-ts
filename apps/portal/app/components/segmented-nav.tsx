import { useState } from 'react'

import { SegmentedControl, SegmentedControlItem } from '@0xintuition/1ui'

import { useNavigate } from '@remix-run/react'

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

  const handleTabClick = (option: OptionType) => {
    setSelectedTab(option.value)
    navigate(option.path)
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
