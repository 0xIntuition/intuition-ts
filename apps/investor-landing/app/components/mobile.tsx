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
import MobileSectionCard from '@components/mobile-section-card/mobile-section-card'
import SunburstCard from '@components/sunburst-card'
import { ScrollIcon } from '@components/svg/scroll-icon'
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

export default function Mobile() {
  const navigate = useNavigate()

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  scrollYProgress.onChange(() => {})

  function handleBack() {
    navigate('/investors')
  }

  return (
    <div className="text-primary bg-black text-center font-rubik">
      <div className="mb-12">
        <button
          className="absolute top-8 left-8 hover:cursor-pointer"
          onClick={handleBack}
          aria-label="Go back"
        >
          <HeaderLogo />
        </button>
        <div className="flex items-center justify-center flex-col gap-12 h-[88vh]">
          <a href={PITCH_DECK} target="_blank" rel="noreferrer">
            <SunburstCard label={'Pitch Deck'} glow="white" disableScale />
          </a>
          <WhitepaperPlayer />
        </div>
        <div className="flex flex-col justify-center h-[10vh] mb-12 gap-2">
          <ScrollIcon className="mx-auto" />
          <Text
            variant={TextVariant.caption}
            className="tracking-widest text-primary/70 uppercase"
          >
            SCROLL
          </Text>
        </div>
      </div>
      <div className="mt-25">
        <MobileSectionCard text={'The Product'} />
        <div className="flex flex-col gap-5 mb-[200px]">
          <Text
            variant={TextVariant.headline}
            weight={TextWeight.medium}
            className="text-primary pb-6 tracking-widest text-center uppercase"
          >
            The Vision
          </Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full px-8">
            <div className="flex justify-center">
              <a href={EXECUTIVE_SUMMARY} target="_blank" rel="noreferrer">
                <SunburstCard
                  label="Executive Summary"
                  size="x-sm"
                  disableScale
                />
              </a>
            </div>
            <div className="flex justify-center">
              <a href={LITE_PAPER} target="_blank" rel="noreferrer">
                <SunburstCard label="Litepaper" size="x-sm" disableScale />
              </a>
            </div>
            <div className="flex justify-center">
              <a href={PODCASTS} target="_blank" rel="noreferrer">
                <SunburstCard label="Podcasts" size="x-sm" disableScale />
              </a>
            </div>
            <div className="flex justify-center">
              <a href={DEMO_VIDEOS} target="_blank" rel="noreferrer">
                <SunburstCard label="Demo Video" size="x-sm" disableScale />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 mb-[200px]">
          <Text
            variant={TextVariant.headline}
            weight={TextWeight.medium}
            className="text-primary pb-6 tracking-widest text-center uppercase"
          >
            How it Works
          </Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full px-8">
            <div className="flex justify-center">
              <a href={WHITE_PAPER} target="_blank" rel="noreferrer">
                <SunburstCard label="Whitepaper" size="x-sm" disableScale />
              </a>
            </div>
            <div className="flex justify-center">
              <a href={DOCS} target="_blank" rel="noreferrer">
                <SunburstCard label="Docs" size="x-sm" disableScale />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-25">
        <MobileSectionCard text={'The Business'} variant="red" />
        <div className="flex flex-col gap-5 mb-[200px]">
          <Text
            variant={TextVariant.headline}
            weight={TextWeight.medium}
            className="text-primary pb-6 tracking-widest text-center uppercase"
          >
            Financials & Tokenomics
          </Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full px-8">
            <div className="flex justify-center">
              <a href={TOKENOMICS} target="_blank" rel="noreferrer">
                <SunburstCard label="Tokenomics" size="x-sm" disableScale />
              </a>
            </div>
            <div className="flex justify-center">
              <a href={FINANCIAL_MODEL} target="_blank" rel="noreferrer">
                <SunburstCard
                  label="Financial Model"
                  size="x-sm"
                  disableScale
                />
              </a>
            </div>
            <div className="flex justify-center">
              <a href={CAP_TABLE} target="_blank" rel="noreferrer">
                <SunburstCard label="Cap Table" size="x-sm" disableScale />
              </a>
            </div>
            <div className="flex justify-center">
              <a href={LEGAL_DOCS} target="_blank" rel="noreferrer">
                <SunburstCard label="Legal Docs" size="x-sm" disableScale />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Text
            variant={TextVariant.headline}
            weight={TextWeight.medium}
            className="text-primary pb-6 tracking-widest text-center uppercase"
          >
            Growth
          </Text>
          <a
            href={GROWTH_STRATEGY}
            target="_blank"
            rel="noreferrer"
            className="mx-auto"
          >
            <SunburstCard label="Strategy" size="sm" disableScale />
          </a>
          <a
            href={MEDIA_MENTIONS}
            target="_blank"
            rel="noreferrer"
            className="mx-auto"
          >
            <SunburstCard label="Media Mentions" size="sm" disableScale />
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-12 h-[100vh]">
        <div className="flex flex-col items-center gap-6">
          <Text
            variant={TextVariant.headline}
            weight={TextWeight.medium}
            className="text-primary pb-6 tracking-widest text-center uppercase"
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
