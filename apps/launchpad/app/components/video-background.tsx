import { cn } from '@0xintuition/1ui'

interface VideoBackgroundProps {
  className?: string
}

export function VideoBackground({ className }: VideoBackgroundProps) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      className={cn(
        'fixed inset-0 h-full w-full object-cover -z-10 opacity-10',
        className,
      )}
    >
      <source src="/background.webm" type="video/webm" />
    </video>
  )
}
