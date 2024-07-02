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
  const navigate = useNavigate()
  const params = useParams()
  const currentPath = window.location.pathname
  const initialTab =
    options.find((option) => currentPath.includes(option.value))?.value ||
    options[0].value
  const [selectedTab, setSelectedTab] = useState(initialTab)

  const handleTabClick = (option: OptionType) => {
    setSelectedTab(option.value)
    const wallet = params.wallet || null
    const id = params.id || null
    let fullPath

    if (option.path) {
      fullPath = option.path
    } else if (option.basePath) {
      if (option.basePath.includes('/identity')) {
        fullPath = `${option.basePath}${id ? '/' + id : ''}${option.value !== 'overview' ? '/' + option.value : ''}`
      } else {
        fullPath = `${option.basePath}${wallet ? '/' + wallet : ''}${option.value !== 'overview' ? '/' + option.value : ''}`
      }
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
