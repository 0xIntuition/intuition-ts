import { Button, Text } from '@0xintuition/1ui'

const DEFAULT_SHARE_CTA =
  'Share this content with your network using a direct link or QR code.'
export interface ShareCtaProps {
  title?: string
  onShareClick: () => void
}

// TODO: Add icon to 1ui

export default function ShareCta({
  title = DEFAULT_SHARE_CTA,
  onShareClick,
}: ShareCtaProps) {
  return (
    <div className="flex flex-col w-full justify-between rounded-lg theme-border items-center gap-3 p-5">
      <div className="flex gap-2 items-center">
        <div className="p-0">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.625 20.625V24.375H24.375M26.625 20.625H30.375M30.375 26.625H26.625V30.375M20.625 29.625V30.375M8.625 30.375H12.375C14.0319 30.375 15.375 29.0319 15.375 27.375V23.625C15.375 21.9681 14.0319 20.625 12.375 20.625H8.625C6.96814 20.625 5.625 21.9681 5.625 23.625V27.375C5.625 29.0319 6.96814 30.375 8.625 30.375ZM23.625 15.375H27.375C29.0319 15.375 30.375 14.0319 30.375 12.375V8.625C30.375 6.96814 29.0319 5.625 27.375 5.625H23.625C21.9681 5.625 20.625 6.96814 20.625 8.625V12.375C20.625 14.0319 21.9681 15.375 23.625 15.375ZM8.625 15.375H12.375C14.0319 15.375 15.375 14.0319 15.375 12.375V8.625C15.375 6.96814 14.0319 5.625 12.375 5.625H8.625C6.96814 5.625 5.625 6.96814 5.625 8.625V12.375C5.625 14.0319 6.96814 15.375 8.625 15.375Z"
              stroke="white"
              strokeOpacity="0.7"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <Text
          variant="caption"
          weight="medium"
          className="text-secondary-foreground/70"
        >
          {title}
        </Text>
      </div>
      <Button variant="secondary" className="w-full" onClick={onShareClick}>
        Share
      </Button>
    </div>
  )
}
