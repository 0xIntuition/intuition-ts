import * as React from 'react'

import { IconName, SidebarProvider } from '@0xintuition/1ui'

import { Outlet, useLocation } from '@remix-run/react'

import { FileExplorerSidebar } from '../../components/FileExplorerSidebar'

export const preferencesTree = [
  {
    id: 'has-preference',
    name: 'has_preference',
    path: '/preferences/folder/has-preference',
    icon: IconName.folder,
    type: 'folder' as const,
    items: [
      {
        id: 'ui-settings',
        name: 'ui_settings',
        path: '/preferences/folder/ui-settings',
        icon: IconName.folder,
        type: 'folder' as const,
        items: [
          {
            id: 'dark-mode',
            name: 'dark_mode',
            path: '/preferences/item/dark-mode',
            icon: IconName.circle,
            type: 'item' as const,
          },
          {
            id: 'light-mode',
            name: 'light_mode',
            path: '/preferences/item/light-mode',
            icon: IconName.circle,
            type: 'item' as const,
          },
        ],
      },
      {
        id: 'interests',
        name: 'interests',
        path: '/preferences/folder/interests',
        icon: IconName.folder,
        type: 'folder' as const,
        items: [
          {
            id: 'crypto',
            name: 'crypto',
            path: '/preferences/item/crypto',
            icon: IconName.circle,
            type: 'item' as const,
          },
          {
            id: 'ai',
            name: 'ai',
            path: '/preferences/item/ai',
            icon: IconName.circle,
            type: 'item' as const,
          },
          {
            id: 'machine-learning',
            name: 'machine_learning',
            path: '/preferences/item/machine-learning',
            icon: IconName.circle,
            type: 'item' as const,
          },
          {
            id: 'nlp',
            name: 'NLP',
            path: '/preferences/item/nlp',
            icon: IconName.circle,
            type: 'item' as const,
          },
        ],
      },
      {
        id: 'clothing',
        name: 'clothing',
        path: '/preferences/folder/clothing',
        icon: IconName.folder,
        type: 'folder' as const,
        items: [
          {
            id: 'shirt-size-medium',
            name: 'shirt_size:medium',
            path: '/preferences/item/shirt-size-medium',
            icon: IconName.circle,
            type: 'item' as const,
          },
          {
            id: 'style-minimalist',
            name: 'style: minimalist',
            path: '/preferences/item/style-minimalist',
            icon: IconName.circle,
            type: 'item' as const,
          },
          {
            id: 'color-scheme-fall',
            name: 'color-scheme:fall',
            path: '/preferences/item/color-scheme-fall',
            icon: IconName.circle,
            type: 'item' as const,
          },
        ],
      },
      {
        id: 'sports',
        name: 'sports',
        path: '/preferences/folder/sports',
        icon: IconName.folder,
        type: 'folder' as const,
        items: [
          {
            id: 'shirt-size-medium',
            name: 'shirt_size:medium',
            path: '/preferences/item/shirt-size-medium',
            icon: IconName.circle,
            type: 'item' as const,
          },
          {
            id: 'style-minimalist',
            name: 'style: minimalist',
            path: '/preferences/item/style-minimalist',
            icon: IconName.circle,
            type: 'item' as const,
          },
          {
            id: 'color-scheme-fall',
            name: 'color-scheme:fall',
            path: '/preferences/item/color-scheme-fall',
            icon: IconName.circle,
            type: 'item' as const,
          },
        ],
      },
    ],
  },
]

export type FileNode = {
  id: string
  name: string
  path: string
  icon?: (typeof IconName)[keyof typeof IconName]
  type: 'folder' | 'item'
  items?: FileNode[]
}

export default function PreferencesLayout() {
  const location = useLocation()

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <FileExplorerSidebar
          items={preferencesTree}
          selectedPath={location.pathname}
        />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
