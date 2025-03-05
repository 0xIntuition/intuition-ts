import { useRef, useState } from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
  IconNameType,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

import { HeaderLogo } from '@components/header-logo'
import { NavigationMenu } from '@components/navigation-menu'
import PathCard from '@components/path-card/path-card'
import PathCardSeparator from '@components/path-card/path-card-separator'
import SunburstCard from '@components/sunburst-card'
import { Business } from '@components/svg/business'
import { Product } from '@components/svg/product'
import {
  CAP_TABLE,
  CONTACT_US,
  DEMO_VIDEOS,
  DOCS,
  EXECUTIVE_SUMMARY,
  FINANCIAL_MODEL,
  GROWTH_STRATEGY,
  LEGAL_DOCS,
  LITE_PAPER,
  MEDIA_MENTIONS,
  PITCH_DECK,
  PODCASTS,
  SCHEDULE_A_CALL,
  TOKENOMICS,
  WHITE_PAPER,
} from '@consts/links'
import { useNavigate } from '@remix-run/react'
import { motion, useScroll, useSpring } from 'framer-motion'

import { WhitepaperPlayer } from './whitepaper-player'

const scrollToRef = (ref: React.RefObject<HTMLElement>) => {
  const handleClick = () => {
    window.scrollTo({
      top: ref.current?.offsetTop,
      left: 0,
      behavior: 'smooth',
    })
  }
  return { handleClick }
}

function Block({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id}>
      <div>{children}</div>
    </section>
  )
}

const IconButtonLink = ({ url, icon }: { url: string; icon: IconNameType }) => (
  <a href={url} target="_blank" rel="noreferrer">
    <Button
      variant={ButtonVariant.secondary}
      size={ButtonSize.iconXl}
      className="transition-all duration-300"
    >
      <Icon name={icon} />
    </Button>
  </a>
)

type Section = 'PITCH_DECK' | 'PICK_PATH' | 'PRODUCT' | 'BUSINESS' | 'JOIN'

export interface IDesktopProps {}

export default function Desktop() {
  const [activeSection, setActiveSection] = useState<Section>('PITCH_DECK')

  const navigate = useNavigate()

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  scrollYProgress.onChange((latest) => {
    if (latest <= 0.2) {
      setActiveSection('PITCH_DECK')
    }
    if (latest > 0.2) {
      setActiveSection('PICK_PATH')
    }
    if (latest > 0.4) {
      setActiveSection('PRODUCT')
    }
    if (latest > 0.7) {
      setActiveSection('BUSINESS')
    }
    if (latest > 0.9) {
      setActiveSection('JOIN')
    }
    console.log('latest is ', latest)
  })
  const pitchDecksRef = useRef(null)
  const chooseYourPathRef = useRef(null)
  const productRef = useRef(null)
  const businessRef = useRef(null)
  const callToActionRef = useRef(null)
  const { handleClick: handleScrollToPitchDecks } = scrollToRef(pitchDecksRef)
  const { handleClick: handleScrollToChooseYourPath } =
    scrollToRef(chooseYourPathRef)
  const { handleClick: handleScrollToProduct } = scrollToRef(productRef)
  const { handleClick: handleScrollToBusiness } = scrollToRef(businessRef)
  const { handleClick: handleScrollToCallToAction } =
    scrollToRef(callToActionRef)

  function handleBack() {
    navigate('/')
  }

  const navigationItems = [
    {
      section: 'PITCH_DECK' as const,
      label: 'Pitch Deck',
      onClick: handleScrollToPitchDecks,
    },
    {
      section: 'PICK_PATH' as const,
      label: 'Pick Your Path',
      onClick: handleScrollToChooseYourPath,
    },
    {
      section: 'PRODUCT' as const,
      label: 'Product',
      onClick: handleScrollToProduct,
    },
    {
      section: 'BUSINESS' as const,
      label: 'Business',
      onClick: handleScrollToBusiness,
    },
    {
      section: 'JOIN' as const,
      label: 'Contact Us',
      onClick: handleScrollToCallToAction,
    },
  ]

  return (
    <div className="text-primary bg-transparent">
      <NavigationMenu activeSection={activeSection} items={navigationItems} />
      <div ref={pitchDecksRef}>
        <Block id="2">
          <>
            <button
              className="absolute top-8 left-8 hover:cursor-pointer"
              onClick={handleBack}
              aria-label="Go back"
            >
              <HeaderLogo />
            </button>
            <div className="flex items-center flex-col justify-center gap-12 h-[88vh]">
              <a href={PITCH_DECK} target="_blank" rel="noreferrer">
                <SunburstCard label={'Pitch Deck'} glow="white" />
              </a>
              <WhitepaperPlayer />
              {/* <Box>Meme Deck</Box> */}
            </div>
          </>
          <>
            <div
              className="flex flex-col justify-center h-[10vh] mb-0"
              ref={chooseYourPathRef}
            >
              {/* <ReactSVG src="scroll-icon.svg" onClick={handleScrollToChooseYourPath} /> */}

              <Button
                variant={ButtonVariant.secondary}
                onClick={
                  activeSection === 'PITCH_DECK'
                    ? handleScrollToChooseYourPath
                    : handleScrollToPitchDecks
                }
                className="w-fit mx-auto"
              >
                <Icon
                  name={
                    activeSection === 'PITCH_DECK'
                      ? IconName.arrowDown
                      : IconName.arrowUp
                  }
                />
              </Button>
            </div>
          </>
        </Block>
      </div>
      <div>
        <Block id="3">
          <div className="h-[90vh] pt-[10vh]">
            <Text
              variant={TextVariant.headline}
              weight={TextWeight.medium}
              className="text-primary pb-6 tracking-widest text-center mb-12 uppercase"
            >
              Follow your Intuition
            </Text>
            <>
              <div className="flex items-center justify-center gap-0 h-[500px]">
                <div className="w-[40vw] h-full">
                  <PathCard
                    heading="The Product"
                    buttonLabel="Choose"
                    handleClick={handleScrollToProduct}
                    type="product"
                  >
                    <Product />
                  </PathCard>
                </div>
                <PathCardSeparator />
                <div className="w-[40vw] h-full">
                  <PathCard
                    heading="The Business"
                    buttonLabel="Choose"
                    handleClick={handleScrollToBusiness}
                    type="business"
                  >
                    <Business />
                  </PathCard>
                </div>
              </div>
            </>
          </div>
        </Block>
      </div>
      <div ref={productRef}>
        <Block id="4">
          <div className="flex items-center justify-evenly gap-12 h-[100vh] relative">
            <div className="absolute top-[5vh] left-1/2 transform -translate-x-1/2 z-10">
              <Button
                variant={ButtonVariant.secondary}
                onClick={handleScrollToChooseYourPath}
                className="w-fit mx-auto"
              >
                <Icon name={IconName.arrowUp} />
              </Button>
            </div>
            <div className="flex flex-col gap-5">
              <Text
                variant={TextVariant.headline}
                weight={TextWeight.medium}
                className="text-primary pb-4 tracking-widest text-center"
              >
                The Vision
              </Text>
              <div className="grid grid-cols-2 gap-5">
                <a href={EXECUTIVE_SUMMARY} target="_blank" rel="noreferrer">
                  <SunburstCard label="Executive Summary" size="sm" />
                </a>
                <a href={LITE_PAPER} target="_blank" rel="noreferrer">
                  <SunburstCard label="Litepaper" size="sm" />
                </a>
                <a href={PODCASTS} target="_blank" rel="noreferrer">
                  <SunburstCard label="Podcasts" size="sm" />
                </a>

                <a href={DEMO_VIDEOS} target="_blank" rel="noreferrer">
                  <SunburstCard label="Demo Video" size="sm" />
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Text
                variant={TextVariant.headline}
                weight={TextWeight.medium}
                className="text-primary pb-4 tracking-widest text-center"
              >
                How it Works
              </Text>
              <a href={WHITE_PAPER} target="_blank" rel="noreferrer">
                <SunburstCard label="Whitepaper" size="sm" />
              </a>
              <a href={DOCS} target="_blank" rel="noreferrer">
                <SunburstCard label="Docs" size="sm" />
              </a>
            </div>
            <div className="absolute bottom-[5vh] left-1/2 transform -translate-x-1/2 z-10">
              <Button
                variant={ButtonVariant.secondary}
                onClick={handleScrollToBusiness}
                className="w-fit mx-auto"
              >
                <Icon name={IconName.arrowDown} />
              </Button>
            </div>
          </div>
        </Block>
      </div>
      <div ref={businessRef}>
        <Block id="5">
          <div className="flex items-center justify-evenly gap-12 h-[100vh] relative">
            <div className="absolute top-[5vh] left-1/2 transform -translate-x-1/2 z-10">
              <Button
                variant={ButtonVariant.secondary}
                onClick={handleScrollToProduct}
                className="w-fit mx-auto"
              >
                <Icon name={IconName.arrowUp} />
              </Button>
            </div>
            <div className="flex flex-col gap-5">
              <Text
                variant={TextVariant.headline}
                weight={TextWeight.medium}
                className="text-primary pb-4 tracking-widest text-center"
              >
                Financials & Tokenomics
              </Text>
              <div className="grid grid-cols-2 gap-5">
                <a href={TOKENOMICS} target="_blank" rel="noreferrer">
                  <SunburstCard label="Tokenomics" size="sm" />
                </a>
                <a href={FINANCIAL_MODEL} target="_blank" rel="noreferrer">
                  <SunburstCard label="Financial Model" size="sm" />
                </a>
                <a href={CAP_TABLE} target="_blank" rel="noreferrer">
                  <SunburstCard label="Cap Table" size="sm" />
                </a>
                <a href={LEGAL_DOCS} target="_blank" rel="noreferrer">
                  <SunburstCard label="Legal Docs" size="sm" />
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Text
                variant={TextVariant.headline}
                weight={TextWeight.medium}
                className="text-primary pb-4 tracking-widest text-center"
              >
                Growth
              </Text>
              <a href={GROWTH_STRATEGY} target="_blank" rel="noreferrer">
                <SunburstCard label="Strategy" size="sm" />
              </a>
              <a href={MEDIA_MENTIONS} target="_blank" rel="noreferrer">
                <SunburstCard label="Media Mentions" size="sm" />
              </a>
            </div>
            <div className="absolute bottom-[5vh] left-1/2 transform -translate-x-1/2 z-10">
              <Button
                variant={ButtonVariant.secondary}
                onClick={handleScrollToCallToAction}
                className="w-fit mx-auto"
              >
                <Icon name={IconName.arrowDown} />
              </Button>
            </div>
          </div>
        </Block>
      </div>
      <div ref={callToActionRef}>
        <Block id="6">
          <div className="flex items-center justify-evenly gap-12 h-[100vh] relative">
            <div className="absolute top-[5vh] left-1/2 transform -translate-x-1/2 z-10">
              <Button
                variant={ButtonVariant.secondary}
                onClick={handleScrollToBusiness}
                className="w-fit mx-auto"
              >
                <Icon name={IconName.arrowUp} />
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center gap-12">
              <div className="flex flex-col align-center gap-6">
                <Text
                  variant={TextVariant.headline}
                  weight={TextWeight.medium}
                  className="text-primary tracking-widest text-center uppercase"
                >
                  Get Involved
                </Text>
                <div className="flex items-center flex-col gap-4">
                  <a href={SCHEDULE_A_CALL} target="_blank" rel="noreferrer">
                    <Button
                      onClick={() => console.log('scheduled call')}
                      variant={ButtonVariant.primary}
                      size={ButtonSize.xl}
                      className="mx-auto uppercase tracking-widest transition-all duration-300"
                    >
                      Schedule a Call
                    </Button>
                  </a>
                  <a
                    href={CONTACT_US}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-all duration-200 text-foreground/50 underline hover:text-foreground hover:underline"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
              <div className="flex justify-end items-end flex-row gap-12">
                <IconButtonLink
                  url={'https://medium.com/0xintuition'}
                  icon={IconName.medium}
                />
                <IconButtonLink
                  url={'https://discord.gg/0xintuition'}
                  icon={IconName.discord}
                />
                <IconButtonLink
                  url={'https://twitter.com/0xIntuition'}
                  icon={IconName.twitter}
                />
              </div>
            </div>
            {/* No bottom arrow for the last section */}
          </div>
        </Block>
      </div>
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          height: '2px',
          background: 'white',
          bottom: '20px',
          scaleX,
        }}
      />
    </div>
  )
}
