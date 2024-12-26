import * as React from 'react'

import { Text, TextVariant } from '@0xintuition/1ui'

import { useParams } from '@remix-run/react'

export default function ItemView() {
  const { itemId } = useParams()

  return (
    <div className="space-y-4">
      <Text variant={TextVariant.heading1}>Item View</Text>
      <Text variant={TextVariant.body}>Viewing item with ID: {itemId}</Text>
      {/* TODO: Add item details */}
    </div>
  )
}
