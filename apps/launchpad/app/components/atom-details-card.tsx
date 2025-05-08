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
  forTvl?: number
  againstTvl?: number
  tvl: number
  position?: number
  mutualConnections?: number
  onStake?: () => void
  onChat?: () => void
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
      className={cn('rounded-lg w-full md:min-w-[480px]', className)}
      {...props}
    >
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 gap-3 sm:gap-0">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded flex items-center justify-center">
              {icon}
            </div>
            <div className="flex flex-col min-w-0">
              <Text
                variant="footnote"
                weight="normal"
                className="text-foreground/70"
              >
                {list}
              </Text>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Text
                  variant="headline"
                  weight="medium"
                  className="text-white truncate max-w-[200px] sm:max-w-none"
                >
                  {name}
                </Text>
                <Text
                  variant="body"
                  weight="normal"
                  className="rounded-xl border border-border/10 px-2 py-0.5 text-[#E6B17E] shrink-0"
                >
                  ID: {atomId}
                </Text>
              </div>
            </div>
          </div>
          <a
            href={`${PORTAL_URL}/app/${listClaim ? 'triple' : 'atom'}/${atomId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant={ButtonVariant.secondary}
              className="w-full sm:w-auto"
            >
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

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-3 sm:px-4 pb-4 gap-2 sm:gap-0">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-amber-500 shrink-0" />
              <Text
                variant="body"
                weight="normal"
                className="text-foreground/90"
              >
                {userCount} user position(s)
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-green-500 shrink-0" />
              <Text
                variant="body"
                weight="normal"
                className="text-foreground/90"
              >
                {tvl.toFixed(6)} ETH TVL
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
