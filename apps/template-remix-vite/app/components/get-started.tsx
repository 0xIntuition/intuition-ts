import {
  Button,
  Icon,
  Text,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@0xintuition/1ui'

export default function GetStarted() {
  return (
    <div className="flex flex-col items-center space-y-12">
      <div className="tracking-wide">
        <span className="opacity-70">Get started by editing </span>
        <span className="font-semibold text-green-500">/app/_index.tsx</span>
      </div>
      <div className="flex items-center gap-8">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Button variant="ghost" className="border-none">
                <a
                  href="https://intuition.systems"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="crystal-ball" className="stroke-current" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="px-2">
              <div className="flex items-center justify-between gap-2">
                <Text variant="caption">Intuition</Text>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Button variant="ghost" className="border-none">
                <a
                  href="https://discord.gg/0xintuition"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="discord" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="px-2">
              <div className="flex items-center justify-between gap-2">
                <Text variant="caption">Discord</Text>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
