import { Button, cn } from '@0xintuition/1ui'

import { Coins, MessageSquare, Users } from 'lucide-react'

interface PreferenceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  app: string
  description: string
  icon: React.ReactNode
  userCount: number
  ethStaked: number
  mutualConnections: number
  onStake: () => void
  onChat: () => void
}

export function PreferenceCard({
  name,
  app,
  description,
  icon,
  userCount,
  ethStaked,
  mutualConnections,
  onStake,
  onChat,
  className,
  ...props
}: PreferenceCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg  bg-gradient-to-b from-[#060504] to-[#101010] min-w-[480px]',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded flex items-center justify-center">
              {icon}
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-sm text-muted-foreground/70">For {app}</p>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-normal text-white">{name}</h3>
                <span className="rounded-xl border border-border/10 px-2 py-0.5 text-sm text-[#E6B17E]">
                  {userCount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle section with description and stats */}
        <div>
          <p className="text-sm text-muted-foreground/90 px-4 pb-4">
            {description}
          </p>
          {/* Dotted line */}
          <div className="py-4">
            <div className="border-t border-dashed border-border/10" />
          </div>

          <div className="flex justify-between items-center px-4 pb-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-muted-foreground/90">
                {userCount} users
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-muted-foreground/90">
                {ethStaked.toFixed(2)} ETH staked
              </span>
            </div>
          </div>
        </div>

        {/* Position info */}
        <div className="flex items-center justify-between bg-black px-6 py-3 rounded-b-lg">
          <div className="flex-col items-start gap-2">
            <p className="text-sm text-muted-foreground/70">Total Staked</p>
            <div className="flex items-center gap-2">
              <p className="text-lg font-medium text-white">
                {ethStaked.toFixed(1)} ETH
              </p>
              <p className="text-sm text-success/90">
                {mutualConnections} connections
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="primary" onClick={onChat}>
              <MessageSquare className="size-4 mr-2" />
              Chat
            </Button>
            <Button variant="secondary" onClick={onStake}>
              <Coins className="size-4 mr-2" />
              Stake
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
