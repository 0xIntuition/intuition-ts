import {
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@0xintuition/1ui'

import { Coins, MessageSquare, MoreVertical, Users } from 'lucide-react'

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
        'rounded-lg border border-border/10 bg-gradient-to-b from-[#060504] to-[#101010] min-w-[480px]',
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
                <span className="rounded bg-[#4D3D2D] px-2 py-0.5 text-sm text-[#E6B17E]">
                  {userCount}
                </span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="size-4 text-muted-foreground/70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Middle section with description and stats */}
        <div className="px-4 pb-4">
          <p className="text-sm text-muted-foreground/90 mb-4">{description}</p>
          <div className="flex justify-between items-center">
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

        {/* Dotted line */}
        <div className="py-4">
          <div className="border-t border-dashed border-border/10" />
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
