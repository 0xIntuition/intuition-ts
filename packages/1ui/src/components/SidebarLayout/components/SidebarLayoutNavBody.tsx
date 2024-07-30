import { cn } from 'styles'

export const SidebarLayoutNavBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('h-full w-full p-2', className)} {...props} />
}
