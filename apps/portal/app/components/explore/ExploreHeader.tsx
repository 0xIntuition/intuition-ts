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
      className={`relative md:flex w-full md:h-52 justify-center w-full rounded-xl theme-border bg-right bg-no-repeat`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full px-6 py-4">
        <Text
          variant={TextVariant.heading5}
          weight={TextWeight.semibold}
          className="flex flex-row justify-between"
        >
          {title}
          <Icon name={icon} className="md:hidden w-8 h-8 text-white" />
        </Text>
        <Text
          variant={TextVariant.bodyLarge}
          weight={TextWeight.normal}
          className="mt-2.5 md:w-1/3 md:text-secondary-foreground"
        >
          {content}
        </Text>
      </div>
      <div className="hidden md:block absolute bottom-4 right-6">
        <Icon name={icon} className="w-8 h-8 text-white" />
      </div>
    </div>
  )
}

export default ExploreHeader
