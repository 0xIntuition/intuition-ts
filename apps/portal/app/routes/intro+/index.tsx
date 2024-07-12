import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'

import { Button, Icon } from '@0xintuition/1ui'

import Container from '@components/container'
import { cn } from '@lib/utils/misc'
import { ActionFunctionArgs } from '@remix-run/node'
import { Link, redirect, useFetcher } from '@remix-run/react'
import { onboardingModalCookie } from '@server/onboarding'
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

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
      video: '',
      title: 'A New Internet.',
      text: (
        <>
          At Intuition, we believe we can do things differently. We refuse to accept the status quo.<br />
          The ways of today will not be the ways of tomorrow.
        </>
      ),      
      button: (
        <Link to="https://docs.intuition.systems/introduction" target="_blank">
          <SlideButton>
            <Icon name="play-circle" className="h-4 w-4 relative" /> Watch the
            tutorial
          </SlideButton>
        </Link>
      ),
    },
    {
      video: '',
      title: 'True Interoperability.',
      text: (
        <>
          Our vision for the future of digital experience is decentralized and agent-centric.<br />
          A communal, interoperable bazaar. A democratized commons for coordination.<br />
        </>
      ),      
      button: (
        <Link
          to="https://docs.intuition.systems/primitives-and-interactions/primitives/identities"
          target="_blank"
        >
          <SlideButton>
            Learn more{' '}
            <Icon name="square-arrow-top-right" className="h-4 w-4 relative" />
          </SlideButton>
        </Link>
      ),
    },
    {
      video: '',
      title: 'A New Set of Primitives.',
      text: (
        <>
          To achieve this vision, Intuition introduces a new set of digital primitives, enabled by blockchain technology.<br />
          These primitives allow for the discrete capturing, structuring, referenceability of information.<br />
        </>
      ),  
      button: (
        <Link
          to="https://docs.intuition.systems/primitives-and-interactions/primitives/claims"
          target="_blank"
        >
          <SlideButton>
            Learn more{' '}
            <Icon name="square-arrow-top-right" className="h-4 w-4 relative" />
          </SlideButton>
        </Link>
      ),
    },
    {
      video: '',
      title: 'Reimagining the way we D.R.E.A.M.',
      text: (
        <>
          This functionality unlocks new possibilities for the way Data can be Refined, Expressed, And Monetized - <br />
          allowing value to more easily flow to the edges of the system: to you, the user.<br />
        </>
      ),  
      button: (
        <Link
          to="https://docs.intuition.systems/primitives-and-interactions/interacations/attestations"
          target="_blank"
        >
          <SlideButton>
            Learn more{' '}
            <Icon name="square-arrow-top-right" className="h-4 w-4 relative" />
          </SlideButton>
        </Link>
      ),
    },
    {
      video: '',
      title: 'A Trustful Interaction Layer.',
      text: (
        <>
          The Intuition System helps to make the layers of the decentralized web that cannot yet be made trustless, trustful.<br />
          We hope to bring more trust to all of your interactions, to help you better decision-make in your everyday life.<br />
        </>
      ),        
      button: (
        <Link
          to="https://docs.intuition.systems/primitives-and-interactions/interacations/query"
          target="_blank"
        >
          <SlideButton>
            Learn more{' '}
            <Icon name="square-arrow-top-right" className="h-4 w-4 relative" />
          </SlideButton>
        </Link>
      ),
    },
    {
      video: '',
      title: 'The Portal',
      text: (
        <>
          The Portal is the initial explorer for the Intuition ecosystem, and a place to gain familiarity with the primitives.<br />
          We hope The Portal will be merely the first step in your exploration of the Intuition ecosystem.<br />
        </>
      ),      
      button: (
        <Link
          to="https://docs.intuition.systems/learn-more/faq"
          target="_blank"
        >
          <SlideButton>
            Learn more{' '}
            <Icon name="square-arrow-top-right" className="h-4 w-4" />
          </SlideButton>
        </Link>
      ),
    },
    {
      video: '',
      title: 'Welcome Aboard.',
      text: (
        <>
          Thank you for being here early.<br />
          We are extremely grateful for the opportunity to build and grow alongside you in this attempt to change the world.<br />
        </>
      ),      
      button: (
        <Link
          to="https://docs.intuition.systems/learn-more/faq"
          target="_blank"
        >
          <SlideButton>
            Learn more{' '}
            <Icon name="square-arrow-top-right" className="h-4 w-4" />
          </SlideButton>
        </Link>
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
      <div className="px-5">
        <Button variant="navigation" className="ml-auto" onClick={onGetStarted}>
          Skip <Icon name="arrow-right" className="h-4 w-4" />
        </Button>
      </div>
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
    text: string
    button: React.ReactNode
  }[]
  options: EmblaOptionsType
  onSlideChange: (index: number) => void
}

const Carousel: React.FC<CarouselProps> = (props) => {
  const { slides, options, onSlideChange } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  useEffect(() => {
    onSlideChange(selectedIndex)
  }, [selectedIndex, onSlideChange])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  return (
    <div className="mx-auto w-[600px]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {slides.map((slide, index) => (
            <div className="w-full flex-none" key={index}>
              <div className="w-full flex-col justify-start items-center gap-3.5 inline-flex">
                <div className="text-center text-white/90 text-3xl font-semibold">
                  {slide.title}
                </div>
                <div className="w-[600px] text-center text-white/70 text-xs font-normal leading-[18px]">
                  {slide.text}
                </div>
              </div>
              <div className="w-full flex-col justify-start items-center gap-7 mt-7 inline-flex">
                {slide.button}
                <div className="w-[500px] h-[300px] bg-black/70 rounded-xl border border-solid border-neutral-300/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-7">
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

const SlideButton: React.FC<ButtonProps> = (props) => {
  const { children, ...restProps } = props

  return (
    <Button variant="secondary" {...restProps} className="mx-auto duration-300">
      <span className="text-xs font-medium leading-[18px] flex gap-2">
        {children}
      </span>
    </Button>
  )
}
