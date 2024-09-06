import { useEffect, useMemo, useState } from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  Text,
  TextVariant,
} from '@0xintuition/1ui'
import { ApiError, IdentitiesService } from '@0xintuition/api'

import PrivyLogout from '@client/privy-logout'
import { Header } from '@components/header'
import { PATHS } from '@consts/paths'
import { getMaintenanceMode } from '@lib/utils/maintenance'
import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { json, Link, useLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { motion } from 'framer-motion'

export async function loader({ request }: LoaderFunctionArgs) {
  getMaintenanceMode()

  const wallet = await requireUserWallet(request)
  if (!wallet) {
    return redirect('/login')
  }

  let userIdentity
  try {
    userIdentity = await fetchWrapper(request, {
      method: IdentitiesService.getIdentityById,
      args: { id: wallet },
    })
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 400 || error.status === 404)
    ) {
      console.error('No user identity associated with wallet')
      return json({ wallet })
    }
    throw error
  }

  if (userIdentity) {
    throw redirect(`${PATHS.HOME}`)
  }

  return json({ wallet })
}

const TerminalText = ({
  text,
  delay = 50,
}: {
  text: string
  delay?: number
}) => {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    let currentIndex = 0
    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(intervalId)
      }
    }, delay)

    return () => {
      clearInterval(intervalId)
    }
  }, [text, delay])

  return <span>{displayText}</span>
}

export default function WelcomePage() {
  const { wallet } = useLoaderData<typeof loader>()
  const [currentParagraph, setCurrentParagraph] = useState(0)
  const paragraphs = useMemo(
    () => [
      'In the beginning, there was nothing. Then suddenly - everything.',
      'All that the universe would ever be composed of, birthed into existence, in an instant.',
      'A single spec of condensed matter, exploding into a vast universe.',
      'While energy would neither be created nor destroyed, the interplay between these newly created atoms would go on to create something beautiful...',
      'What was made separate would once again become whole. And what would be created in the process would be even more beautiful than what came before...',
      "Our story begins with the 'atom'.",
      'The fundamental building block of our universe.',
      "And our 'atoms' begin with you.",
    ],
    [],
  )

  useEffect(() => {
    if (currentParagraph < paragraphs.length - 1) {
      const timer = setTimeout(() => {
        setCurrentParagraph((prevParagraph) => prevParagraph + 1)
      }, paragraphs[currentParagraph].length * 50)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [currentParagraph, paragraphs])

  const allParagraphsDisplayed = currentParagraph === paragraphs.length - 1

  return (
    <div className="flex flex-col min-h-screen w-full p-8">
      <Header />
      <div className="flex-grow flex justify-center items-center">
        <div className="flex-col justify-start items-start inline-flex gap-6 relative">
          <h1 className="text-4xl font-bold mb-4 md:mb-6 text-center md:text-left">
            Chapter 0: The Big Bang
          </h1>
          <div className="w-full md:w-[675px] h-[600px] md:h-[360px] space-y-1.5 md:space-y-2 relative">
            {paragraphs
              .slice(0, currentParagraph + 1)
              .map((paragraph, index) => (
                <Text
                  key={index}
                  variant={TextVariant.bodyLarge}
                  className="text-primary/70"
                >
                  <TerminalText text={paragraph} />
                </Text>
              ))}
            {allParagraphsDisplayed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 3 }}
                className="absolute bottom-[-10px] left-0 right-0 mt-8 md:bottom-[-60px] md:left-0 md:right-0"
              >
                <Link to="/create">
                  <Button
                    variant={ButtonVariant.primary}
                    size={ButtonSize.lg}
                    className="w-40 m-auto"
                  >
                    Begin
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <PrivyLogout wallet={wallet} />
    </div>
  )
}
