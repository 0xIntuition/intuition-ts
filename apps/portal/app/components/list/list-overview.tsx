import { Button, Icon, Text } from '@0xintuition/1ui'

import logger from '@lib/utils/logger'
import { useNavigate } from '@remix-run/react'

export function ListOverview() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-row justify-between items-start">
      <div className="flex flex-col mb-10">
        <Text
          variant="headline"
          weight="medium"
          className="theme-secondary-foreground w-full"
        >
          Lists
        </Text>
        <Text
          variant="footnote"
          weight="regular"
          className="theme-secondary-foreground/50"
        >
          Begin the process of establishing a new digital
          <br />
          representation within the blockchain network.
        </Text>
      </div>
      <div className="flex flex-row gap-2.5">
        <Button
          variant="secondary"
          onClick={() => navigate(`/app/explore/lists`)}
        >
          <Icon name="magnifying-glass" className="mr-2" />
          Explore
        </Button>
        <Button variant="secondary">
          <Icon
            name="plus-small"
            className="mr-2"
            onClick={() => logger('create new list clicked')} // TODO: [ENG-2798] - add the create list functionality
          />
          Create new list
        </Button>
      </div>
    </div>
  )
}
