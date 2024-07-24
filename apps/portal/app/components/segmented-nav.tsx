import { useState } from 'react'

import { SegmentedControl, SegmentedControlItem } from '@0xintuition/1ui'

import { Link, useLocation, useNavigate, useParams } from '@remix-run/react'

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
  const location = useLocation()
  const initialTab =
    options.find((option) => location.pathname.includes(option.value))?.value ||
    options[0].value
  const [selectedTab, setSelectedTab] = useState(initialTab)

  const getPath = (option: OptionType) => {
    const { wallet, id } = params
    const basePath = option.basePath || '/app/profile'
    const idOrWallet = option.basePath?.includes('/identity') ? id : wallet
    const suffix = option.value !== 'overview' ? `/${option.value}` : ''

    return (
      option.path || `${basePath}${idOrWallet ? `/${idOrWallet}` : ''}${suffix}`
    )
  }

  const handleTabClick = (option: OptionType) => {
    setSelectedTab(option.value)
    navigate(getPath(option))
  }

  return (
    <SegmentedControl className="w-fit">
      {options.map((option, index) => (
        <Link
          key={index}
          to={getPath(option)}
          prefetch="intent"
          onClick={(e) => {
            e.preventDefault()
            handleTabClick(option)
          }}
        >
          <SegmentedControlItem isActive={selectedTab === option.value}>
            {option.label}
          </SegmentedControlItem>
        </Link>
      ))}
    </SegmentedControl>
  )
}
