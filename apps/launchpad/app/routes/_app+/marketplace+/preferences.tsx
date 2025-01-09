import { useState } from 'react'

import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  PageHeader,
  ScrollArea,
} from '@0xintuition/1ui'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { useLoaderData } from '@remix-run/react'
import { loader } from '@routes/_index'
import { users } from 'app/data/mock-leaderboard'
import { categories } from 'app/data/mock-preferences'
import { Brain, Plus } from 'lucide-react'
import { LoaderFunctionArgs } from '@remix-run/node'


export async function loader({ request }: LoaderFunctionArgs) {

const initialCategories = [
  { id: 'productivity', name: 'Productivity' },
  { id: 'design', name: 'Design' },
  { id: 'security', name: 'Security' },
]

const initialPreferences = [
  {
    id: 1,
    name: 'Dark Mode Pro',
    app: 'Visual Studio Code',
    description: 'Enhanced dark mode settings for comfortable coding',
    icon: 'palette',
    category: 'design',
    userCount: 1500,
    ethStaked: 25.5,
    mutualConnections: 12,
  },
  // ... add more mock preferences as needed
]

  return {
    preferences: initialPreferences,
    categories: initialCategories,
  }
}

export default function PreferencesMarketplace() {
  const {
    preferences: initialLoadedPreferences,
    categories: initialLoadedCategories,
  } = useLoaderData<typeof loader>()
  const [preferences, setPreferences] = useState(initialLoadedPreferences)
  const [categories, setCategories] = useState(initialLoadedCategories)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
      <PageHeader title="Preferences Marketplace" />
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Preference
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Preference</DialogTitle>
              <DialogDescription>
                Create a new preference to share with the community.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
