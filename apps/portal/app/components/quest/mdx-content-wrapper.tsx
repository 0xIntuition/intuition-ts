import React from 'react'

import { Text, TextVariant, TextWeight } from '@0xintuition/1ui'

import { MDXContent } from '@content-collections/mdx/react'
import { MDXContentVariant, MDXContentVariantType } from 'types/quest'

interface MDXContentWrapperProps {
  code: string
  variant?: MDXContentVariantType
}

export function getMdxComponents(variant: MDXContentVariantType) {
  const commonComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <Text
        variant={TextVariant.headline}
        weight={TextWeight.medium}
        {...props}
      />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <Text
        variant={TextVariant.bodyLarge}
        className="text-foreground/50"
        {...props}
      />
    ),
  }
  switch (variant) {
    case MDXContentVariant.LORE: {
      return {
        ...commonComponents,
        // Add any lore-specific component overrides here if needed
      }
    }
    default:
      return commonComponents
  }
}

function getComponentData(variant: MDXContentVariantType) {
  switch (variant) {
    case MDXContentVariant.LORE:
      return {
        baseClass: 'flex flex-col gap-2',
        components: getMdxComponents(variant),
      }
    default:
      return {
        baseClass: 'flex flex-col gap-5 py-5',
        components: getMdxComponents(variant),
      }
  }
}

export default function MDXContentWrapper({
  code,
  variant = 'default',
}: MDXContentWrapperProps) {
  const { baseClass, components } = getComponentData(variant)

  return (
    <div className={baseClass}>
      <MDXContent code={code} components={components} />
    </div>
  )
}
