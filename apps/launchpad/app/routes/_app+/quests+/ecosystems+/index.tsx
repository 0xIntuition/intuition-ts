import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

import EcosystemCard from '@components/ecosystem-card'
import { ErrorPage } from '@components/error-page'
import { LoadingState } from '@components/loading-state'
import { PageHeader } from '@components/page-header'
import { useGoBack } from '@lib/hooks/useGoBack'
import { useFeatureFlags } from '@lib/providers/feature-flags-provider'
import type { Epoch } from '@lib/types'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { getUser } from '@server/auth'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'

export async function loader({ request }: LoaderFunctionArgs) {
  const queryClient = new QueryClient()

  // Start parallel fetches for critical data
  const [user, epochsResponse] = await Promise.all([
    getUser(request),
    fetch(`${new URL(request.url).origin}/resources/get-epochs?type=ecosystem`),
  ])

  const userWallet = user?.wallet?.address?.toLowerCase()

  const epochsData = await epochsResponse.json()
  if (!epochsData.epochs) {
    throw new Error('No epochs data received')
  }
  await queryClient.setQueryData(['get-ecosystem-epochs'], epochsData.epochs)

  return {
    dehydratedState: dehydrate(queryClient),
    userWallet,
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return []
  }

  return [
    {
      title: 'Ecosystems | Intuition Launchpad',
    },
    {
      name: 'description',
      content:
        'Explore different ecosystems and earn IQ points by contributing to the Intuition Graph.',
    },
    {
      property: 'og:title',
      content: 'Ecosystems | Intuition Launchpad',
    },
    {
      property: 'og:image',
      content:
        'https://res.cloudinary.com/dfpwy9nyv/image/upload/v1743793743/Ecosystem%20Assets/Site%20Metadata/site_metadata_banner.png',
    },
    { property: 'og:site_name', content: 'Intuition Launchpad' },
    { property: 'og:locale', content: 'en_US' },
    {
      name: 'twitter:image',
      content:
        'https://res.cloudinary.com/dfpwy9nyv/image/upload/v1743793743/Ecosystem%20Assets/Site%20Metadata/site_metadata_banner.png',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'Ecosystems | Intuition Launchpad',
    },
    {
      name: 'twitter:description',
      content:
        'Explore different ecosystems and earn IQ points by contributing to the Intuition Graph.',
    },
    { name: 'twitter:site', content: '@0xIntuition' },
  ]
}

export function ErrorBoundary() {
  return <ErrorPage routeName="ecosystems" />
}

export default function Ecosystems() {
  const goBack = useGoBack({ fallbackRoute: `/quests` })
  const { featureFlags } = useFeatureFlags()
  const { data: epochs = [], isLoading } = useQuery<Epoch[]>({
    queryKey: ['get-ecosystem-epochs'],
    queryFn: async () => {
      const response = await fetch('/resources/get-epochs?type=ecosystem')
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch ecosystem epochs')
      }
      return data.epochs
    },
  })

  if (isLoading) {
    return <LoadingState />
  }

  // Filter out epoch with ID 4 if FF_ARBITRUM_EPOCH_ENABLED is set
  const filteredEpochs =
    featureFlags.FF_ARBITRUM_EPOCH_ENABLED === 'true'
      ? epochs
      : epochs.filter((epoch) => epoch.name !== 'Arbitrum')

  return (
    <>
      <div className="flex items-center gap-4 mb-4 md:mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="border-none bg-background-muted"
          onClick={goBack}
        >
          <Icon name="chevron-left" className="h-4 w-4" />
        </Button>
        <PageHeader
          title="Ecosystems"
          subtitle="Create, curate, and discover crowdsourced maps of crypto's various ecosystems."
        />
      </div>
      {/* Call to Action Section */}
      <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-xl">
            <Text variant={TextVariant.headline} weight={TextWeight.semibold}>
              Your Contributions Shape the Ecosystem Map
            </Text>
            <Text variant={TextVariant.body} className="text-foreground/70">
              The ecosystem quests you complete contribute to a decentralized
              map of crypto&apos;s various ecosystems. View the complete map to
              see how your contributions connect with others.
            </Text>
          </div>
          <Button
            variant={ButtonVariant.primary}
            size={ButtonSize.lg}
            onClick={() =>
              window.open('https://ecosystems.intuition.systems', '_blank')
            }
            className="whitespace-nowrap flex-shrink-0 w-full lg:w-auto"
          >
            <Icon name="layout-grid" className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">View Ecosystem Map</span>
            <span className="sm:hidden">View Map</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEpochs.map((epoch) => (
          <EcosystemCard key={epoch.id} epoch={epoch} />
        ))}
        <div className="rounded-lg shadow-sm overflow-hidden aspect-square bg-primary/5 backdrop-blur-md backdrop-saturate-150 border border-border/10 p-0 relative group">
          {/* Content */}
          <div className="relative h-full p-5 flex flex-col justify-between">
            <div className="flex items-center justify-center h-full mb-2.5 rounded-md bg-gradient-to-br from-muted/70 via-muted/20 to-muted/50"></div>

            {/* Bottom Content */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-end justify-between">
                  <div className="space-y-1">
                    <Text
                      variant={TextVariant.headline}
                      weight={TextWeight.semibold}
                      className="text-white"
                    >
                      Coming Soon
                    </Text>
                    <Text variant={TextVariant.body} className="text-white/70">
                      A new ecosystem is being prepared for you
                    </Text>
                  </div>
                </div>

                <div className="flex border-t border-white/10 pt-4">
                  <Button
                    variant={ButtonVariant.primary}
                    className="w-full justify-center transition-colors opacity-50 cursor-not-allowed"
                    size={ButtonSize.lg}
                    disabled
                  >
                    Coming Soon
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
