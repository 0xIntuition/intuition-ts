import * as React from 'react'

import { IconName, SidebarProvider } from '@0xintuition/1ui'

import { Outlet, useLocation } from '@remix-run/react'

import { FileExplorerSidebar } from '../../components/file-explorer-sidebar'

export const preferencesTree = [
  {
    id: 'has-preference',
    name: 'has_preference',
    path: '/preferences/has-preference',
    icon: IconName.folder,
    type: 'folder' as const,
    items: [
      {
        id: 'ui-settings',
        name: 'ui_settings',
        path: '/preferences/has-preference/ui-settings',
        icon: IconName.folder,
        type: 'folder' as const,
        items: [
          {
            id: 'dark-mode',
            name: 'dark_mode',
            path: '/preferences/has-preference/ui-settings/dark-mode',
            icon: IconName.circle,
            type: 'item' as const,
          },
          {
            id: 'light-mode',
            name: 'light_mode',
            path: '/preferences/has-preference/ui-settings/light-mode',
            icon: IconName.circle,
            type: 'item' as const,
          },
        ],
      },
      {
        id: 'interests',
        name: 'interests',
        path: '/preferences/has-preference/interests',
        icon: IconName.folder,
        type: 'folder' as const,
        items: [
          {
            id: 'crypto',
            name: 'crypto',
            path: '/preferences/has-preference/interests/crypto',
            icon: IconName.circle,
            type: 'item' as const,
          },
          {
            id: 'ai',
            name: 'ai',
            path: '/preferences/has-preference/interests/ai',
            icon: IconName.circle,
            type: 'item' as const,
          },
          {
            id: 'machine-learning',
            name: 'machine_learning',
            path: '/preferences/has-preference/interests/machine-learning',
            icon: IconName.circle,
            type: 'item' as const,
          },
          {
            id: 'nlp',
            name: 'NLP',
            path: '/preferences/has-preference/interests/nlp',
            icon: IconName.circle,
            type: 'item' as const,
          },
        ],
      },
      {
        id: 'clothing',
        name: 'clothing',
        path: '/preferences/has-preference/clothing',
        icon: IconName.folder,
        type: 'folder' as const,
        items: [
          {
            id: 'shirt-size-medium',
            name: 'shirt_size:medium',
            path: '/preferences/has-preference/clothing/shirt-size-medium',
            icon: IconName.circle,
            type: 'item' as const,
          },
          {
            id: 'style-minimalist',
            name: 'style: minimalist',
            path: '/preferences/has-preference/clothing/style-minimalist',
            icon: IconName.circle,
            type: 'item' as const,
          },
          {
            id: 'color-scheme-fall',
            name: 'color-scheme:fall',
            path: '/preferences/has-preference/clothing/color-scheme-fall',
            icon: IconName.circle,
            type: 'item' as const,
          },
        ],
      },
      {
        id: 'sports',
        name: 'sports',
        path: '/preferences/has-preference/sports',
        icon: IconName.folder,
        type: 'folder' as const,
        items: [
          {
            id: 'shirt-size-medium',
            name: 'shirt_size:medium',
            path: '/preferences/has-preference/sports/shirt-size-medium',
            icon: IconName.circle,
            type: 'item' as const,
          },
          {
            id: 'style-minimalist',
            name: 'style: minimalist',
            path: '/preferences/has-preference/sports/style-minimalist',
            icon: IconName.circle,
            type: 'item' as const,
          },
          {
            id: 'color-scheme-fall',
            name: 'color-scheme:fall',
            path: '/preferences/has-preference/sports/color-scheme-fall',
            icon: IconName.circle,
            type: 'item' as const,
          },
        ],
      },
    ],
  },
]

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
