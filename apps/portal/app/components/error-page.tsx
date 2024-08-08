import { Button, Text } from '@0xintuition/1ui'

import { cn } from '@lib/utils/misc'
import { PATHS, SUPPORT_EMAIL_ADDRESS } from 'app/consts'

import NavigationButton from './navigation-link'

const StatusCode = ({ statusCode }: { statusCode: number }) => {
  return (
    <>
      <span className="max-sm:hidden">
        <Text variant="heading1" weight="bold" className="text-9xl">
          {statusCode}
        </Text>
      </span>
      <span className="sm:hidden">
        <Text variant="heading2" weight="bold" className="text-7xl">
          {statusCode}
        </Text>
      </span>
    </>
  )
}

const ErrorPageTitle = ({
  statusCode,
  title,
}: {
  statusCode: number | null
  title: string | React.ReactNode
}) => {
  return (
    <>
      <span className="max-sm:hidden">
        <Text variant={statusCode ? 'heading1' : 'heading3'} weight="medium">
          {title}
        </Text>
      </span>
      <span className="sm:hidden">
        <Text variant="heading3" weight="medium">
          {title}
        </Text>
      </span>
    </>
  )
}

export const ErrorPage = ({
  statusCode,
  title,
  description,
}: {
  statusCode: number | null
  title: string | React.ReactNode
  description: string
}) => {
  const descriptionArray = description.split('\n')
  return (
    <div className="flex h-[100vh] w-full items-center p-6 justify-center gap-12 max-lg:flex-col-reverse max-lg:gap-2 max-md:gap-0">
      <div
        className={cn(
          'flex flex-col max-w-[500px] gap-2 max-lg:items-center max-lg:text-center max-sm:gap-6',
          !statusCode && 'items-center [&>div]:text-center gap-4',
        )}
      >
        <ErrorPageTitle statusCode={statusCode} title={title} />
        <div className="flex flex-col max-lg:text-center">
          {descriptionArray?.map((content, index) => (
            <Text
              variant={statusCode ? 'bodyLarge' : 'headline'}
              className="text-secondary/30"
              key={index}
            >
              {content}
            </Text>
          ))}
        </div>
        <div className="flex gap-6 mt-5 max-sm:flex-col max-sm:w-full">
          <NavigationButton variant="primary" size="lg" to={PATHS.ROOT}>
            Back to home
          </NavigationButton>
          <Button
            variant="ghost"
            size="lg"
            className="rounded-full"
            onClick={() =>
              (window.location.href = `mailto:${SUPPORT_EMAIL_ADDRESS}`)
            }
          >
            Contact Support
          </Button>
        </div>
      </div>
      {statusCode && <StatusCode statusCode={statusCode} />}
    </div>
  )
}
