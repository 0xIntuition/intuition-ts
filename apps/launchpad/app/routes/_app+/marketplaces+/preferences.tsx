import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EmptyStateCard,
  Input,
  PageHeader,
  ScrollArea,
} from '@0xintuition/1ui'

import { AddPreferenceForm } from '@components/preferences/add-preference-form'
import { PreferenceCard } from '@components/preferences/preference-card'
import { PreferenceChat } from '@components/preferences/preference-chat'
import { StakeEthForm } from '@components/preferences/stake-eth-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import logger from '@lib/utils/logger'
import { useLoaderData } from '@remix-run/react'
import { categories, preferences } from 'app/data/mock-preferences'
import {
  Bell,
  Palette,
  Plus,
  Search,
  Shield,
  Smartphone,
  User,
  Zap,
} from 'lucide-react'

interface Category {
  id: string
  name: string
}

interface Preference {
  id: number
  name: string
  app: string
  description: string
  category: string
  icon?: { name: string }
  userCount: number
  ethStaked: number
  mutualConnections: number
}

export async function loader() {
  return {
    preferences,
    categories: [{ id: 'all', name: 'All' }, ...categories],
  }
}

export default function PreferencesMarketplace() {
  const { categories, preferences } = useLoaderData<typeof loader>() as {
    categories: Category[]
    preferences: Preference[]
  }
  const [searchQuery, setSearchQuery] = useState('')

  const [activeDialog, setActiveDialog] = useState<{
    type: 'stake' | 'chat'
    prefId: number
  } | null>(null)

  const filteredPreferences = (categoryId: string) => {
    return preferences.filter((pref) => {
      const matchesCategory =
        categoryId === 'all' || pref.category === categoryId
      const matchesSearch =
        searchQuery.trim() === '' ||
        pref.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pref.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pref.app.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Palette':
        return Palette
      case 'Zap':
        return Zap
      case 'Shield':
        return Shield
      case 'Bell':
        return Bell
      case 'Smartphone':
        return Smartphone
      default:
        return Palette
    }
  }

  // Placeholders for now -- will implement with actual logic
  const handleAddPreference = () => {
    logger('action')
    setActiveDialog(null)
  }

  const handleStakeEth = () => {
    logger('action')
    setActiveDialog(null)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageHeader title="Preferences Marketplace" />
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <Input
              type="search"
              placeholder="Search preferences..."
              className="w-[300px] pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="ghost" size="icon" className="border-none">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <ScrollArea className="w-full">
              <TabsList className="w-full justify-start">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="min-w-24"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>
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
              <AddPreferenceForm onAddPreference={handleAddPreference} />
            </DialogContent>
          </Dialog>
        </div>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPreferences(category.id).length === 0 ? (
                <div className="col-span-2">
                  <EmptyStateCard
                    message={`No preferences found${
                      searchQuery ? ` matching "${searchQuery}"` : ''
                    } in ${category.name === 'All' ? 'any category' : category.name}`}
                  />
                </div>
              ) : (
                filteredPreferences(category.id).map((pref) => {
                  const IconComponent = getIconComponent(
                    pref.icon?.name || 'Palette',
                  )
                  return (
                    <PreferenceCard
                      key={pref.id}
                      name={pref.name}
                      app={pref.app}
                      description={pref.description}
                      icon={
                        <IconComponent className="h-5 w-5 text-amber-500" />
                      }
                      userCount={pref.userCount}
                      ethStaked={pref.ethStaked}
                      mutualConnections={pref.mutualConnections}
                      onStake={() =>
                        setActiveDialog({ type: 'stake', prefId: pref.id })
                      }
                      onChat={() =>
                        setActiveDialog({ type: 'chat', prefId: pref.id })
                      }
                    />
                  )
                })
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <Dialog
        open={activeDialog?.type === 'stake'}
        onOpenChange={() => setActiveDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stake ETH</DialogTitle>
            <DialogDescription>
              Stake ETH on this preference to show your support.
            </DialogDescription>
          </DialogHeader>
          <StakeEthForm
            onStake={() => {
              if (activeDialog?.prefId) {
                handleStakeEth()
              }
            }}
            currentStake={0}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeDialog?.type === 'chat'}
        onOpenChange={() => setActiveDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preference Chat</DialogTitle>
            <DialogDescription>
              Chat with others about this preference.
            </DialogDescription>
          </DialogHeader>
          <PreferenceChat
            preferenceName={
              preferences.find((p) => p.id === activeDialog?.prefId)?.name || ''
            }
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
