import { Button, Icon, Text } from '@0xintuition/1ui'

const LockdownView = () => {
  return (
    <div className="m-auto w-3/4">
      <div className="w-[33rem]">
        <div className="flex items-center gap-2 text-secondary-foreground/80">
          <Icon name="square-x" />
          <Text variant="bodyLarge" className="text-secondary-foreground/80">
            Service Unavailable
          </Text>
        </div>
        <Text variant="heading2">Maintenance in Progress</Text>
        <Text
          variant="headline"
          className="text-secondary-foreground/50 mt-2 mb-8"
        >
          We&apos;re currently performing some essential maintenance on
          Intuition. Please check back later. In the meantime, join our Discord
          community to stay updated and connect with us!
        </Text>
        <Button variant="secondary">Join our Discord</Button>
      </div>
    </div>
  )
}

export default LockdownView
