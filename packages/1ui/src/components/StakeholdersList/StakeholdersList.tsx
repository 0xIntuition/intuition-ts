import { Identity } from 'types'

import { Avatar, Text, TextVariant } from '..'

interface Stakeholder {
  name: string
  avatar?: string
}

interface StakeholdersListProps {
  stakeholders: Stakeholder[]
}

export const StakeholdersList: React.FC<StakeholdersListProps> = ({
  stakeholders,
}) => {
  if (!stakeholders?.length) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {stakeholders.map((stakeholder, i) => (
          <Avatar
            key={i}
            variant={Identity.user}
            src={stakeholder.avatar}
            name={stakeholder.name}
            className="w-6 h-6 rounded-full"
          />
        ))}
      </div>
      <Text variant={TextVariant.body} className="text-secondary/70">
        {stakeholders
          .map((s, i) => {
            if (stakeholders.length === 1) {
              return s.name
            }
            if (i === stakeholders.length - 1) {
              return `and ${s.name}`
            }
            if (stakeholders.length > 2) {
              return `${s.name}, `
            }
            return `${s.name} `
          })
          .join('')}{' '}
        {stakeholders.length === 1 ? 'has' : 'have'} staked on this claim
      </Text>
    </div>
  )
}
