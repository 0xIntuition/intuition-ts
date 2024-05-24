import { useTheme } from '@storybook/theming'
import { Toaster as Sonner, toast } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      // toastOptions={{
      //   classNames: {
      //     toast:
      //       'group toast group-[.toaster]:border group-[.toaster]:border-solid group-[.toaster]:border-primary/30 group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
      //     description: 'group-[.toast]:text-muted-foreground',
      //     actionButton:
      //       'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
      //     cancelButton:
      //       'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
      //   },
      // }}
      {...props}
    />
  )
}

export { Toaster, toast }
