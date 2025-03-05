import { cn } from '@0xintuition/1ui'

import panelImage from '@assets/panel.png'

export function SunburstNoGlow({
  className,
  width = '445',
  height = '445',
}: {
  className?: string
  width?: string
  height?: string
}) {
  return (
    <div className={cn(className, 'backdrop-blur-md')}>
      <img src={panelImage} alt="Panel" width={width} height={height} />
    </div>
  )
}
