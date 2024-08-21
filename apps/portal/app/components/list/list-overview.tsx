import { Button, Icon, Text } from '@0xintuition/1ui'

import { useNavigate } from '@remix-run/react'

export function ListOverview() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-row justify-between items-start">
      <div className="flex flex-col mb-10">
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground w-full"
        >
          Lists
        </Text>
        <Text
          variant="footnote"
          weight="regular"
          className="text-secondary-foreground/50"
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
      </div>
    </div>
  )
}
