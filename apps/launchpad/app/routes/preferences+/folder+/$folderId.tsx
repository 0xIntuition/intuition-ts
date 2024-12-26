import * as React from 'react'

import { Text, TextVariant } from '@0xintuition/1ui'

import { useParams } from '@remix-run/react'

export default function FolderView() {
  const { folderId } = useParams()

  return (
    <div className="space-y-4">
      <Text variant={TextVariant.heading1}>Folder View</Text>
      <Text variant={TextVariant.body}>Viewing folder with ID: {folderId}</Text>
      {/* TODO: Add grid of folder items */}
    </div>
  )
}
