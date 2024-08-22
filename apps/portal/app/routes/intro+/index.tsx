import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'

import { Button, Icon, Text, TextVariant } from '@0xintuition/1ui'

import Container from '@components/container'
import { getMaintenanceMode } from '@lib/utils/maintenance'
import { cn } from '@lib/utils/misc'
import { ActionFunctionArgs, json } from '@remix-run/node'
import { redirect, useFetcher } from '@remix-run/react'
import { onboardingModalCookie } from '@server/onboarding'
import {
  INTRO_CAROUSEL_1_MP4,
  INTRO_CAROUSEL_2_MP4,
  INTRO_CAROUSEL_3_MP4,
  INTRO_CAROUSEL_4_MP4,
  INTRO_CAROUSEL_5_MP4,
  INTRO_CAROUSEL_6_MP4,
} from 'app/consts'
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { AnimatePresence, motion } from 'framer-motion'

export async function loader() {
  getMaintenanceMode()
  return json({})
}

export async function action({ request }: ActionFunctionArgs) {
  const redirectUrl = (await request.formData()).get('redirectUrl')

  return redirect(typeof redirectUrl === 'string' ? redirectUrl : '/login', {
    headers: {
      'Set-Cookie': await onboardingModalCookie.serialize({
        dateOnboardingCompleted: new Date().valueOf(),
      }),
    },
  })
}

export default function IntroRoute() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)
  const handleSlideChange = (index: number) => {
    setSelectedIndex(index)
  }

  const OPTIONS: EmblaOptionsType = {
    dragFree: true,
    containScroll: 'trimSnaps',
  }

  const SLIDES = [
    {
      video: INTRO_CAROUSEL_1_MP4,
      title: 'Welcome to the Intuition Beta',
      text: (
        <div className="flex flex-col gap-2 text-justify md:text-center">
          <Text variant={TextVariant.caption} className="text-foreground/70">
            A single moment of frustration has the power to change the world
            forever. It can spark revolutions, drive innovation, or alter the
            trajectory of societies in ways we may never fully predict.
          </Text>
        </div>
      ),
    },
    {
      video: INTRO_CAROUSEL_2_MP4,
      title: 'The Information Economy',
      text: (
        <div className="flex flex-col gap-2 text-justify md:text-center">
          <Text variant={TextVariant.caption} className="text-foreground/70">
            The ideas we have and decisions we make are only as good as the data
            we consume. Intuition is an attempt to change the way we interact
            with data by harnessing the collective power of the wisdom of the
            crowds, introducing the concept of ‘information markets’ to disrupt
            the current data paradigm.
          </Text>
        </div>
      ),
    },
    {
      video: INTRO_CAROUSEL_3_MP4,
      title: 'The Trustful Interaction Layer',
      text: (
        <div className="flex flex-col gap-2 text-justify md:text-center">
          <Text variant={TextVariant.caption} className="text-foreground/70">
            With your help, we will usher in a new era of digital interaction.
            One where you have the data you need, when you need it, from the
            voices you trust - bringing more trust to all of our interactions.
          </Text>
        </div>
      ),
    },
    {
      video: INTRO_CAROUSEL_4_MP4,
      title: 'A Novel Set of Primitives',
      text: (
        <div className="flex flex-col gap-2 text-justify md:text-center">
          <Text variant={TextVariant.caption} className="text-foreground/70">
            To achieve this vision, Intuition introduces Atoms, Triples, and
            Signal - a new set of primitives recently made possible by Ethereum.
            These primitives facilitate the discrete capturing, structuring, and
            referenceability of information.
          </Text>
        </div>
      ),
    },
    {
      video: INTRO_CAROUSEL_5_MP4,
      title: 'The Portal',
      text: (
        <div className="flex flex-col gap-2 text-justify md:text-center">
          <Text variant={TextVariant.caption} className="text-foreground/70">
            This application, The Portal, is merely an Explorer (akin to
            Etherscan) for the Intuition ecosystem. At its core, Intuition is
            developer tooling & a platform of platforms, powered by the
            Intuition Protocol and associated middleware. We hope this is just
            the beginning of your journey into the Intuition ecosystem.
          </Text>
        </div>
      ),
    },
    {
      video: INTRO_CAROUSEL_6_MP4,
      title: 'What Comes Next?',
      text: (
        <div className="flex flex-col gap-2 text-justify md:text-center">
          <Text variant={TextVariant.caption} className="text-foreground/70">
            Intuition asks a simple question: ‘what if we reimagine the way that
            value flows through data?’ With your participation, we can decouple
            identities, data, and algorithms from platforms, disintermediate
            trillions in value, and flow this value back to you - the user.
          </Text>
        </div>
      ),
    },
  ]

  const fetcher = useFetcher()

  const onGetStarted = () => {
    if (formRef.current) {
      formRef.current.requestSubmit()
    }
  }

  return (
    <Container>
      <Button
        variant="navigation"
        className="ml-auto md:absolute md:top-8 md:right-8 md:z-10"
        onClick={onGetStarted}
      >
        Skip <Icon name="arrow-right" className="h-4 w-4" />
      </Button>
      <Carousel
        slides={SLIDES}
        options={OPTIONS}
        onSlideChange={handleSlideChange}
      />
      <fetcher.Form method="post" className="flex w-full" ref={formRef}>
        <input hidden name="redirectUrl" value={'/login'} readOnly />
        <Button
          onClick={onGetStarted}
          className={cn(
            'absolute left-1/2 m-auto w-fit -translate-x-1/2 translate-y-full',
            {
              hidden: selectedIndex !== SLIDES.length - 1,
            },
          )}
        >
          Get started
        </Button>
      </fetcher.Form>
    </Container>
  )
}

type CarouselProps = {
  slides: {
    video: string
    title: string
    text: React.ReactNode
    button?: React.ReactNode
  }[]
  options: EmblaOptionsType
  onSlideChange: (index: number) => void
}

const Carousel: React.FC<CarouselProps> = (props) => {
  const { slides, options, onSlideChange } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const { scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  useEffect(() => {
    onSlideChange(selectedIndex)
  }, [selectedIndex, onSlideChange])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === selectedIndex) {
          video
            .play()
            .catch((error) => console.error('Autoplay failed:', error))
        } else {
          video.pause()
          video.currentTime = 0
        }
      }
    })
  }, [selectedIndex])

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div className="w-full flex-none" key={index}>
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <div className="text-center text-white/90 text-3xl font-semibold mb-4">
                    {slide.title}
                  </div>
                  <div className="text-center text-white/70 text-base font-normal mb-4 md:w-[600px] m-auto">
                    {slide.text}
                    {slide.button && slide.button}
                  </div>
                </div>
                <div className="flex justify-center mb-8">
                  <AnimatePresence>
                    <motion.div
                      key="mediaPlayer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                    >
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={slide.video}
                        title={slide.title}
                        loop
                        muted
                        playsInline
                        className="rounded-xl w-full md:h-[300px] overflow-hidden items-center justify-center theme-border"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <div className="flex gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'h-1.5 w-1.5 rounded-full bg-primary/25'.concat(
                index === selectedIndex
                  ? 'h-1.5 w-1.5 rounded-full bg-primary-100'
                  : '',
              )}
            />
          ))}
        </div>
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  )
}

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) {
      return
    }
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) {
      return
    }
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

type ButtonProps = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>

const PrevButton: React.FC<ButtonProps> = (props) => {
  const { children, ...restProps } = props

  return (
    <Button
      size="iconLg"
      variant="ghost"
      className="fill-neutral-300 hover:fill-neutral-100 disabled:fill-neutral-500 duration-300"
      {...restProps}
      disabled={restProps.disabled}
    >
      <svg className="h-2 w-2" viewBox="0 0 532 532">
        <path d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z" />
      </svg>
      {children}
    </Button>
  )
}

const NextButton: React.FC<ButtonProps> = (props) => {
  const { children, ...restProps } = props

  return (
    <Button
      size="iconLg"
      variant="ghost"
      className="fill-neutral-300 hover:fill-neutral-100 disabled:fill-neutral-500 duration-300"
      {...restProps}
      disabled={restProps.disabled}
    >
      <svg className="h-2 w-2" viewBox="0 0 532 532">
        <path d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z" />
      </svg>
      {children}
    </Button>
  )
}

type UseDotButtonProps = {
  selectedIndex: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}

const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
): UseDotButtonProps => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) {
        return
      }
      emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  }
}

const DotButton: React.FC<ButtonProps> = (props) => {
  const { children, ...restProps } = props

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  )
}

export const SlideButton: React.FC<ButtonProps> = (props) => {
  const { children, ...restProps } = props

  return (
    <Button variant="secondary" {...restProps} className="mx-auto duration-300">
      <span className="text-xs font-medium leading-[18px] flex gap-2">
        {children}
      </span>
    </Button>
  )
}
