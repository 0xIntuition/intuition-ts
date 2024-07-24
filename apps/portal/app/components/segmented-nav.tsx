import { SegmentedControl, SegmentedControlItem } from '@0xintuition/1ui'

import { NavLink, useNavigate, useParams } from '@remix-run/react'

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
    navigate(getPath(option))
  }

  return (
    <SegmentedControl className="w-fit">
      {options.map((option, index) => (
        <NavLink
          key={index}
          to={getPath(option)}
          prefetch="intent"
          end={option.value === 'overview'}
          onClick={(e) => {
            e.preventDefault()
            handleTabClick(option)
          }}
        >
          {({ isActive }) => (
            <SegmentedControlItem isActive={isActive}>
              {option.label}
            </SegmentedControlItem>
          )}
        </NavLink>
      ))}
    </SegmentedControl>
  )
}
