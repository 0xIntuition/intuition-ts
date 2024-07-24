import { useEffect, useState } from 'react'

import { SegmentedControl, SegmentedControlItem } from '@0xintuition/1ui'

import { useLocation, useParams } from '@remix-run/react'

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
  const params = useParams()
  const location = useLocation()
  const [selectedTab, setSelectedTab] = useState('')

  useEffect(() => {
    const currentTab =
      options.find((option) => location.pathname.includes(option.value))
        ?.value || options[0].value
    setSelectedTab(currentTab)
  }, [location.pathname, options])

  const getFullPath = (option: OptionType) => {
    const wallet = params.wallet || ''
    const id = params.id || ''

    if (option.path) {
      return option.path
    }

    if (option.basePath) {
      const suffix = option.value !== 'overview' ? `/${option.value}` : ''
      if (option.basePath.includes('/identity')) {
        return `${option.basePath}${id ? `/${id}` : ''}${suffix}`
      }
      return `${option.basePath}${wallet ? `/${wallet}` : ''}${suffix}`
    }

    const basePath = '/app/profile'
    const suffix = option.value !== 'overview' ? `/${option.value}` : ''
    return wallet ? `${basePath}/${wallet}${suffix}` : `${basePath}${suffix}`
  }

  return (
    <SegmentedControl className="w-fit">
      {options.map((option, index) => (
        <SegmentedControlItem
          key={index}
          isActive={selectedTab === option.value}
          to={getFullPath(option)}
          onClick={() => setSelectedTab(option.value)}
        >
          {option.label}
        </SegmentedControlItem>
      ))}
    </SegmentedControl>
  )
}
