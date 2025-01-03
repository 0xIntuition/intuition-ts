import type { Meta, StoryObj } from '@storybook/react'

import { useGetStatsQuery } from '../../../../graphql/dist'
import { AggregatedMetrics } from './AggregatedMetrics'

const meta: Meta<typeof AggregatedMetrics> = {
  title: 'Components/AggregatedMetrics',
  component: AggregatedMetrics,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof AggregatedMetrics>

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ minWidth: '1200px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    metrics: [
      { label: 'TVL', value: 13.34, suffix: 'ETH' },
      { label: 'Atoms', value: 4200 },
      { label: 'Triples', value: 4200 },
      { label: 'Signals', value: 4200, hideOnMobile: true },
      { label: 'Users', value: 4200 },
    ],
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
    <AggregatedMetrics
      metrics={[
        {
          label: 'TVL',
          value: systemStats?.stats?.[0]?.contract_balance || 0,
          suffix: 'ETH',
        },
        { label: 'Atoms', value: systemStats?.stats?.[0]?.total_atoms || 0 },
        {
          label: 'Triples',
          value: systemStats?.stats?.[0]?.total_triples || 0,
        },
        {
          label: 'Signals',
          value: systemStats?.stats?.[0]?.total_positions || 0,
          hideOnMobile: true,
        },
        { label: 'Users', value: systemStats?.stats?.[0]?.total_accounts || 0 },
      ]}
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
          'This example shows the AggregatedMetrics component with live data fetched from the Intuition GraphQL API.',
      },
    },
  },
}
