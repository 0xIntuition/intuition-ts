import { Button, ButtonVariant, cn, Text } from '@0xintuition/1ui'

import { PORTAL_URL } from '@consts/general'
import { Coins, ExternalLink, Users } from 'lucide-react'

interface AtomDetailsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  list?: string
  icon: React.ReactNode
  atomId: number
  listClaim: boolean
  userCount: number
  tvl: number
  position?: number
}

export function AtomDetailsCard({
  name,
  list,
  icon,
  atomId,
  listClaim = true, // TODO: Add handling for regular atoms (not in a list)
  userCount,
  tvl,
  className,
  ...props
}: AtomDetailsCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-gradient-to-b from-[#060504] to-[#101010] min-w-[480px]',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="size-6 rounded flex items-center justify-center">
              {icon}
            </div>
            <div className="flex flex-col ">
              <Text
                variant="footnote"
                weight="normal"
                className="text-foreground/70"
              >
                {list}
              </Text>
              <div className="flex items-center gap-3">
                <Text variant="headline" weight="medium" className="text-white">
                  {name}
                </Text>
                <Text
                  variant="body"
                  weight="normal"
                  className="rounded-xl border border-border/10 px-2 py-0.5 text-[#E6B17E]"
                >
                  ID: {atomId}
                </Text>
              </div>
            </div>
          </div>
          <a
            href={`${PORTAL_URL}/${listClaim ? 'claim' : 'identity'}/${atomId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant={ButtonVariant.secondary}>
              <ExternalLink className="h-4 w-4" />
              View on Portal
            </Button>
          </a>
        </div>

        {/* Middle section with description and stats */}
        <div>
          {/* <Text
            variant="caption"
            weight="normal"
            className="text-foreground/90 px-4 pb-4"
          >
            Created by {creator}
          </Text> */}
          {/* Dotted line */}
          <div className="py-4">
            <div className="border-t border-dashed border-border/10" />
          </div>

          <div className="flex justify-between items-center px-4 pb-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-amber-500" />
              <Text
                variant="body"
                weight="normal"
                className="text-foreground/90"
              >
                {userCount} user position(s)
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-green-500" />
              <Text
                variant="body"
                weight="normal"
                className="text-foreground/90"
              >
                {tvl.toFixed(4)} ETH TVL
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
