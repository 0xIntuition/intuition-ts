import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@0xintuition/1ui'

import {
  ConnectionsHeader,
  ConnectionsHeaderVariants,
  ConnectionsHeaderVariantType,
} from '@components/profile/connections-header'
import logger from '@lib/utils/logger'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
  return json({
    message: 'hack the planet',
  })
}

const TabContent = ({
  value,
  variant,
}: {
  value: string
  variant: ConnectionsHeaderVariantType
}) => (
  <TabsContent value={value}>
    <ConnectionsHeader
      variant={variant}
      userIdentity={{
        name: 'John Doe',
      }}
      userTotals={{
        total_position_value: '3.5467',
      }}
    />
  </TabsContent>
)

export default function ProfileWalletConnections() {
  const { message } = useLoaderData<typeof loader>()
  logger('message from profile overview loader', message)

  return (
    <div className="flex flex-col items-center w-full mt-10">
      <Text
        variant="headline"
        weight="medium"
        className="theme-secondary-foreground w-full mb-3"
      >
        Connections
      </Text>

      <div className="w-full ">
        <Tabs defaultValue={ConnectionsHeaderVariants.followers}>
          <TabsList>
            {/* TODO: Where does total count come from? */}
            <TabsTrigger
              value={ConnectionsHeaderVariants.followers}
              label="Followers"
              totalCount={100}
            />
            <TabsTrigger
              value={ConnectionsHeaderVariants.following}
              label="Following"
              totalCount={100}
            />
          </TabsList>
          <div className="bg-primary/10 rounded-lg">
            <TabContent
              value={ConnectionsHeaderVariants.followers}
              variant={ConnectionsHeaderVariants.followers}
            />
            <TabContent
              value={ConnectionsHeaderVariants.following}
              variant={ConnectionsHeaderVariants.following}
            />
          </div>
        </Tabs>
      </div>
    </div>
  )
}
