import { Button, Icon, Text } from '@0xintuition/1ui'

import { useNavigate } from '@remix-run/react'

interface HomeSectionHeaderProps {
  title: string
  buttonText: string
  buttonLink: string
}

export function HomeSectionHeader({
  title,
  buttonText,
  buttonLink,
}: HomeSectionHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="flex justify-between items-center">
      <Text
        variant="headline"
        weight="medium"
        className="text-secondary-foreground"
      >
        {title}
      </Text>
      <Button
        variant="secondary"
        className="w-fit"
        onClick={() => navigate(buttonLink)}
      >
        {buttonText}
        <Icon name="arrow-up-right" className="w-3 h-3 text-primary ml-2" />
      </Button>
    </div>
  )
}
