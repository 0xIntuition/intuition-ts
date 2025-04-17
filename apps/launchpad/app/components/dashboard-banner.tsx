import { useState } from 'react'

import { Button } from '@0xintuition/1ui'

import { useNavigate } from '@remix-run/react'

import { Banner } from './ui/banner'

export function DashboardBanner() {
  const [isVisible] = useState(true)
  const navigate = useNavigate()

  if (!isVisible) {
    return null
  }

  return (
    <Banner
      variant="arbitrum"
      className="dark text-foreground"
      rounded="default"
    >
      <div className="flex w-full gap-2 md:items-center">
        <div className="flex grow gap-3 md:items-center">
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/15 max-md:mt-0.5"
            aria-hidden="true"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 373.9 422"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.2,128.3v165.5c0,10.5,5.6,20.3,14.8,25.5L172.2,402c9.1,5.3,20.4,5.3,29.5,0L345,319.3 c9.1-5.3,14.8-15,14.8-25.5V128.3c0-10.5-5.6-20.3-14.8-25.6L201.7,20c-9.1-5.3-20.4-5.3-29.5,0L28.9,102.7 C19.9,108,14.2,117.7,14.2,128.3z"
                fill="#213147"
              />
              <path
                d="M218.3,243.1l-20.5,56c-0.6,1.5-0.6,3.3,0,4.8l35.1,96.4l40.7-23.5l-48.8-133.8 C223.7,240,219.4,240,218.3,243.1L218.3,243.1z"
                fill="#12AAFF"
              />
              <path
                d="M259.2,148.8c-1.1-3.1-5.4-3.1-6.6,0l-20.5,56c-0.6,1.6-0.6,3.3,0,4.8l57.6,157.9l40.7-23.5L259.2,148.8 L259.2,148.8z"
                fill="#12AAFF"
              />
              <path
                d="M187,26.1c1,0,2,0.3,2.9,0.8l155,89.5c1.8,1,2.9,2.9,2.9,5v179c0,2.1-1.1,4-2.9,5l-155,89.6 c-0.9,0.5-1.9,0.8-2.9,0.8s-2-0.3-2.9-0.8l-155-89.5c-1.8-1-2.9-2.9-2.9-5V121.4c0-2.1,1.1-4,2.9-5l155-89.5 C185,26.4,186,26.1,187,26.1 M187,0c-5.5,0-11.1,1.5-16,4.3L16,93.8c-9.8,5.7-16,16.2-16,27.6v179c0,11.4,6.1,22,16,27.7l155,89.5 c4.9,2.9,10.4,4.3,16,4.3s11.1-1.5,16-4.3l155-89.5c9.9-5.7,16-16.2,16-27.7v-179c0-11.4-6.1-22-16-27.7L203,4.3 C198,1.5,192.5,0,187,0L187,0L187,0z"
                fill="#9DCCED"
              />
              <path
                d="M84.5,367.7 L98.8,328.7 127.4,352.5 100.7,377"
                fill="#213147"
              />
              <path
                d="M173.9,108.7h-39.3c-2.9,0-5.6,1.8-6.6,4.6l-84.2,231l40.7,23.5l92.8-254.4 C178.1,111.1,176.4,108.7,173.9,108.7L173.9,108.7z"
                fill="#FFFFFF"
              />
              <path
                d="M242.7,108.7h-39.3c-2.9,0-5.6,1.8-6.6,4.6L100.7,377l40.7,23.5L246,113.4 C246.9,111.1,245.1,108.7,242.7,108.7z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
          <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="text-lg font-medium">
                Announcing the Arbitrum Epoch!
              </p>
              <p className="text-base text-primary/80">
                Join us in mapping out the Arbitrum ecosystem and earn IQ Points
                for your insights
              </p>
            </div>
            <div className="flex gap-2 max-md:flex-wrap">
              <Button
                size="sm"
                className="text-sm px-2.5 py-1.5 rounded-md"
                onClick={() => navigate('/quests/ecosystems')}
              >
                Start Mapping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Banner>
  )
}
