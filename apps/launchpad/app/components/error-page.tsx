import { Button, cn, Text } from '@0xintuition/1ui'

import { Link, useRouteError } from '@remix-run/react'

import logger from '../lib/utils/logger'

export const ErrorPage = ({
  isAtRoot,
  routeName,
  statusCode,
  description,
}: {
  isAtRoot?: boolean
  routeName: string
  statusCode?: number
  description?: string
}) => {
  const error = useRouteError()
  logger(`ERROR BOUNDARY (${routeName}):`, error)

  const descriptionArray = description
    ? description.split('\n')
    : ['Oh no! Something went wrong with our flux capacitor']

  return (
    <div className="flex h-[100vh] w-full items-center p-6 justify-center gap-12 max-lg:flex-col-reverse max-lg:gap-2 max-md:gap-0">
      <div
        className={cn(
          'flex flex-col max-w-[500px] gap-2 max-lg:items-center max-lg:text-center max-sm:gap-6',
          !statusCode && 'items-center [&>div]:text-center gap-4',
        )}
      >
        <div className="flex flex-col max-lg:text-center">
          {descriptionArray?.map((content, index) => (
            <Text
              variant={statusCode ? 'bodyLarge' : 'headline'}
              className="text-secondary/50"
              key={index}
            >
              {content}
            </Text>
          ))}
        </div>
        <div className="flex gap-6 mt-5 max-sm:flex-col max-sm:w-full">
          {isAtRoot ? (
            <Link to="/" reloadDocument={!isAtRoot}>
              <Button variant="primary" size="lg">
                Back to home
              </Button>
            </Link>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          )}
          <Link
            to="https://discord.com/channels/909531430881746974/1151564740255043604"
            target="_blank"
          >
            <Button variant="ghost" size="lg" className="rounded-full">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
      {statusCode && (
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
      )}
    </div>
  )
}
