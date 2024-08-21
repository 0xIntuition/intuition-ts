import * as React from 'react'

import {
  Icon,
  IconNameType,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

export interface ExploreHeaderProps {
  title: string
  content: string
  icon: IconNameType
  bgImage: string
}

const ExploreHeader: React.FC<ExploreHeaderProps> = ({
  title,
  content,
  icon,
  bgImage,
}: ExploreHeaderProps) => {
  return (
    <div
      className={`relative flex w-[973px] h-[250px] justify-center w-full rounded-xl theme-border bg-right bg-no-repeat`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full px-6 py-4">
        <Text variant={TextVariant.heading3} weight={TextWeight.semibold}>
          {title}
        </Text>
        <Text
          variant={TextVariant.headline}
          weight={TextWeight.normal}
          className="mt-2.5 md:w-1/3 md:text-secondary-foreground"
        >
          {content}
        </Text>
      </div>
      <div className="absolute bottom-4 right-6">
        <Icon name={icon} className="w-12 h-12 text-white" />
      </div>
    </div>
  )
}

export default ExploreHeader
