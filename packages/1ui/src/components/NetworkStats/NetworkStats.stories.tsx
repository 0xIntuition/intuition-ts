import type { Meta, StoryObj } from '@storybook/react'

import { useGetStatsQuery } from '../../../../graphql/dist'
import { NetworkStats } from './NetworkStats'

const meta: Meta<typeof NetworkStats> = {
  title: 'Components/Network/NetworkStats',
  component: NetworkStats,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof NetworkStats>

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ minWidth: '1200px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    tvl: 13.34,
    atomsCount: 4200,
    triplesCount: 4200,
    signalsCount: 4200,
    usersCount: 4200,
  },
}

const SmartNetworkStats = () => {
  const { data: systemStats } = useGetStatsQuery(
    {},
    {
      queryKey: ['get-stats'],
    },
  )

  return (
    <NetworkStats
      tvl={systemStats?.stats?.[0]?.contract_balance || 0}
      atomsCount={systemStats?.stats?.[0]?.total_atoms || 0}
      triplesCount={systemStats?.stats?.[0]?.total_triples || 0}
      signalsCount={systemStats?.stats?.[0]?.total_positions || 0}
      usersCount={systemStats?.stats?.[0]?.total_accounts || 0}
    />
  )
}

export const WithLiveData: Story = {
  decorators: [
    (Story) => (
      <div style={{ minWidth: '1200px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => <SmartNetworkStats />,
  parameters: {
    docs: {
      description: {
        story:
          'This example shows the NetworkStats component with live data fetched from the Intuition GraphQL API..',
      },
    },
  },
}
