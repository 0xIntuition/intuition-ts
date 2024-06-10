import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'

import { Button } from '@0xintuition/1ui'

import Container from '@components/container'
import { cn } from '@lib/utils/misc'
import { ActionFunctionArgs } from '@remix-run/node'
import { Link, redirect, useFetcher } from '@remix-run/react'
import { onboardingModalCookie } from '@server/onboarding'
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowRight, ExternalLink } from 'lucide-react'

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
      title: 'Hello, Beta Tester',
      text: 'Welcome to the world’s first flexible and open system for capturing and curating verifiable social wisdom.',
      button: (
        <Link to="https://docs.intuition.systems/introduction" target="_blank">
          <SlideButton>
            What is Intuition? <ExternalLink className="h-4 w-4" />
          </SlideButton>
        </Link>
      ),
    },
    {
      video: '',
      title: 'Create Identities',
      text: 'Create identities to populate the Intuition knowledge graph. Identities are the smallest units of knowledge in Intuition that make up a claim. ',
      button: (
        <Link
          to="https://docs.intuition.systems/primitives-and-interactions/primitives/identities"
          target="_blank"
        >
          <SlideButton>
            Learn more <ExternalLink className="h-4 w-4" />
          </SlideButton>
        </Link>
      ),
    },
    {
      video: '',
      title: 'Create Claims',
      text: 'A claim is a combination of 3 identities in a Semantic Triple format (Subject, Predicate, Object). Create claims using identity building blocks to form a statement about an identity. ',
      button: (
        <Link
          to="https://docs.intuition.systems/primitives-and-interactions/primitives/claims"
          target="_blank"
        >
          <SlideButton>
            Learn more <ExternalLink className="h-4 w-4" />
          </SlideButton>
        </Link>
      ),
    },
    {
      video: '',
      title: 'Staking',
      text: 'Staking represents your perceived value and belief in an identity or claim. Deposit ETH on the identities and claims you have conviction in. Earn ETH for contributing valuable truths that other users also believe in.',
      button: (
        <Link
          to="https://docs.intuition.systems/primitives-and-interactions/interacations/attestations"
          target="_blank"
        >
          <SlideButton>
            Learn more <ExternalLink className="h-4 w-4" />
          </SlideButton>
        </Link>
      ),
    },
    {
      video: '',
      title: 'Querying',
      text: 'Search and discover what’s actually relevant and important to you within the Intuition universe. Search for identities, claims, and more to traverse crowdsourced verifiable data.',
      button: (
        <Link
          to="https://docs.intuition.systems/primitives-and-interactions/interacations/query"
          target="_blank"
        >
          <SlideButton>
            Learn more <ExternalLink className="h-4 w-4" />
          </SlideButton>
        </Link>
      ),
    },
    {
      video: '',
      title: 'Helpful Tips',
      text: 'Got more questions? Check out our Gitbook documentation below, send us an email, or find us in Discord.',
      button: (
        <Link
          to="https://docs.intuition.systems/learn-more/faq"
          target="_blank"
        >
          <SlideButton>
            Learn more <ExternalLink className="h-4 w-4" />
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
          Skip <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="mx-auto">
        <Carousel
          slides={SLIDES}
          options={OPTIONS}
          onSlideChange={handleSlideChange}
        />
      </div>

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
    <div className="py-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {slides.map((slide, index) => (
            <div className="w-full flex-none" key={index}>
              <h3 className="mb-4 text-center text-3xl font-semibold text-primary-100">
                {slide.title}
              </h3>
              <p className="px-16 mb-4 text-center text-primary-100/50">
                {slide.text}
              </p>
              {slide.button}
              <div className="h-[380px]"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="z-1 flex items-center justify-center gap-4">
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
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

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
    <button
      type="button"
      className="rounded-lg border fill-primary-100 p-2 transition-colors duration-300 hover:bg-primary-100/5 disabled:pointer-events-none disabled:fill-primary-100/50 disabled:hover:bg-transparent"
      {...restProps}
      disabled={restProps.disabled}
    >
      <svg className="h-2 w-2" viewBox="0 0 532 532">
        <path d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z" />
      </svg>
      {children}
    </button>
  )
}

const NextButton: React.FC<ButtonProps> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      type="button"
      className="rounded-lg border fill-primary-100 p-2 transition-colors duration-300 hover:bg-primary-100/5 disabled:pointer-events-none disabled:fill-primary-100/50 disabled:hover:bg-transparent"
      {...restProps}
      disabled={restProps.disabled}
    >
      <svg className="h-2 w-2" viewBox="0 0 532 532">
        <path d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z" />
      </svg>
      {children}
    </button>
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
      if (!emblaApi) return
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
    if (!emblaApi) return

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
    <Button variant="secondary" {...restProps} className="mx-auto">
      <span className="flex items-center justify-center gap-2 text-sm">
        {children}
      </span>
    </Button>
  )
}
