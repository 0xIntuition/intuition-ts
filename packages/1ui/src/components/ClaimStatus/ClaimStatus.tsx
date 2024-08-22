import React from 'react'

import { Icon, IconName } from 'components/Icon'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'components/Tooltip'

interface ClaimStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  claimsFor: number
  claimsAgainst: number
  claimsForValue: number
  claimsAgainstValue: number
}

const ClaimStatus = ({
  claimsFor = 0,
  claimsAgainst = 0,
  claimsForValue = 0,
  claimsAgainstValue = 0,
  children,
}: ClaimStatusProps) => {
  const againstPercentage =
    +(+claimsAgainstValue / (+claimsForValue + +claimsAgainstValue)) * 100

  return (
    <div className="flex flex-col justify-between max-md:w-full max-md:justify-center">
      <div className="flex items-center h-[6px] mb-4">
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger className="h-full w-full bg-for block rounded-r-sm" />
            <TooltipContent>
              <div
                className={
                  'flex flex-col justify-center items-start w-full rounded-lg gap-2.5 max-lg:min-w-max max-lg:items-center'
                }
              >
                <div className="flex flex-row gap-2">
                  <Icon name={IconName.people} className="text-for h-4 w-4" />
                  {claimsFor}
                  <Icon name={IconName.moneybag} className="text-for h-4 w-4" />
                  {claimsForValue} ETH
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger
              className="h-full bg-against block rounded-l-sm"
              style={{ minWidth: `${againstPercentage}%` }}
            />
            <TooltipContent>
              <div
                className={
                  'flex flex-col justify-center items-start w-full rounded-lg gap-2.5 max-lg:min-w-max max-lg:items-center'
                }
              >
                <div className="flex flex-row gap-2">
                  <Icon
                    name={IconName.people}
                    className="text-against h-4 w-4"
                  />
                  {claimsAgainst}
                  <Icon
                    name={IconName.moneybag}
                    className="text-against h-4 w-4"
                  />
                  {claimsAgainstValue} ETH
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {children}
    </div>
  )
}

export { ClaimStatus }
