import { Icon, Text, TextVariant } from '@0xintuition/1ui'

import { Link } from '@remix-run/react'
import { Abi, Address } from 'viem'

interface ClaimrRequest {
  type: string
  payload: unknown
}

declare global {
  interface Window {
    claimr?: {
      set_user_token: (token: string) => void
      set_theme: (theme: string) => void
      logout: () => void
      connect_wallet: (
        address: string,
        signature: string,
        message: string,
      ) => void
      on_request: (
        chainId: string,
        request: ClaimrRequest,
        contract: Address,
        method: string,
        args: unknown[],
        abi: Abi,
      ) => Promise<string>
    }
  }
}
export default function ClaimrRoute() {
  return (
    <div className="flex w-full flex-col items-center justify-start">
      <div className="mt-[16vh] flex flex-col items-start justify-center gap-4 max-w-lg">
        <Icon
          name="lightning-bolt"
          className="w-16 h-16 mb-5 text-foreground/80"
        />
        <div className="flex flex-col gap-2">
          <Text variant={TextVariant.headline}>
            Check back soon for the start of our final IQ Blitz Quests.
          </Text>
          <div className="text-foreground/60">
            Be the first by looking out for an announcement in{' '}
            <Link
              to="https://discord.com/invite/0xintuition"
              className="text-accent font-semibold"
              target="_blank"
            >
              Discord
            </Link>
          </div>
          <div className="text-foreground/60">
            Your final point balance from IQ Blitz will be added to your overall
            IQ after the conclusion of the Blitz campaign.
          </div>
        </div>
      </div>
    </div>
  )
}
