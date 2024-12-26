import * as React from 'react'

import { IconName, SidebarProvider } from '@0xintuition/1ui'

import { Outlet, useLocation, useNavigate } from '@remix-run/react'

import { FileExplorerSidebar } from '../../components/FileExplorerSidebar'

const preferencesTree = [
  {
    name: 'UI Settings',
    path: '/preferences/ui-settings',
    icon: IconName.folder,
    nodes: [
      {
        name: 'dark_mode',
        path: '/preferences/ui-settings/dark-mode',
        icon: IconName.circle,
      },
      {
        name: 'light_mode',
        path: '/preferences/ui-settings/light-mode',
        icon: IconName.circle,
      },
    ],
  },
  {
    name: 'Interests',
    path: '/preferences/interests',
    icon: IconName.folder,
    nodes: [
      {
        name: 'crypto',
        path: '/preferences/interests/crypto',
        icon: IconName.circle,
      },
      {
        name: 'ai',
        path: '/preferences/interests/ai',
        icon: IconName.circle,
      },
      {
        name: 'machine_learning',
        path: '/preferences/interests/machine-learning',
        icon: IconName.circle,
      },
      {
        name: 'NLP',
        path: '/preferences/interests/nlp',
        icon: IconName.circle,
      },
    ],
  },
  {
    name: 'Clothing',
    path: '/preferences/clothing',
    icon: IconName.folder,
    nodes: [
      {
        name: 'shirt_size:medium',
        path: '/preferences/clothing/shirt-size-medium',
        icon: IconName.circle,
      },
      {
        name: 'style: minimalist',
        path: '/preferences/clothing/style-minimalist',
        icon: IconName.circle,
      },
      {
        name: 'color-scheme:fall',
        path: '/preferences/clothing/color-scheme-fall',
        icon: IconName.circle,
      },
    ],
  },
  {
    name: 'Sports',
    path: '/preferences/sports',
    icon: IconName.folder,
    nodes: [
      {
        name: 'shirt_size:medium',
        path: '/preferences/sports/shirt-size-medium',
        icon: IconName.circle,
      },
      {
        name: 'style: minimalist',
        path: '/preferences/sports/style-minimalist',
        icon: IconName.circle,
      },
      {
        name: 'color-scheme:fall',
        path: '/preferences/sports/color-scheme-fall',
        icon: IconName.circle,
      },
    ],
  },
]

export default function PreferencesLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleSelect = (path: string) => {
    navigate(path)
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <FileExplorerSidebar
          items={preferencesTree}
          selectedPath={location.pathname}
          onSelect={handleSelect}
        />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
