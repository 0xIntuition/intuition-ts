import { cn } from 'styles'

export const SidebarLayoutContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('h-full w-full', className)} {...props} />
}
