import { useState, useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  PageHeader,
  ScrollArea,
} from '@0xintuition/1ui'

import { PreferenceCard } from '@components/preferences/preference-card'
import { PreferenceChat } from '@components/preferences/preference-chat'
import { StakeEthForm } from '@components/preferences/stake-eth-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { useLoaderData } from '@remix-run/react'
import { categories, preferences } from 'app/data/mock-preferences'
import { Bell, Palette, Plus, Shield, Smartphone, Zap } from 'lucide-react'
import logger from '@lib/utils/logger'

export async function loader() {
  return {
    preferences,
    categories: [{ id: 'all', name: 'All' }, ...categories],
  }
}

export default function PreferencesMarketplace() {
  const { categories, preferences } = useLoaderData<typeof loader>()


  const [activeDialog, setActiveDialog] = useState<{
    type: 'stake' | 'chat'
    prefId: number
  } | null>(null)

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

  const handleStakeEth = (preferenceId: number, amount: number) => {
    // setPreferences(preferences.map(pref => 
    //   pref.id === preferenceId ? { ...pref, ethStaked: pref.ethStaked + amount } : pref
    // ))
    logger('action')
    setActiveDialog(null)
  }

  return (
    <>
      <PageHeader title="Preferences Marketplace" />
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
            </DialogContent>
          </Dialog>
        </div>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {preferences
                .filter(
                  (pref) =>
                    category.id === 'all' || pref.category === category.id,
                )
                .map((pref) => {
                  const IconComponent = getIconComponent(pref.icon.name)
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
                      onStake={() => setActiveDialog({ type: 'stake', prefId: pref.id })}
                      onChat={() => setActiveDialog({ type: 'chat', prefId: pref.id })}
                    />
                  )
                })}
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
            onStake={(amount) => {
              if (activeDialog?.prefId) {
                handleStakeEth(activeDialog.prefId, amount)
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
