import { useCallback, useEffect, useMemo, useState } from 'react'

import { FeaturedListCard } from '@0xintuition/1ui'
import { ClaimPresenter } from '@0xintuition/api'

import { cn, getListUrl } from '@lib/utils/misc'
import { Link } from '@remix-run/react'
import type { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

interface FeaturedListCarouselProps {
  lists: ClaimPresenter[]
}

export function FeaturedListCarousel({ lists }: FeaturedListCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)
  const AUTO_SCROLL_INTERVAL = 8000

  const options = useMemo<EmblaOptionsType>(
    () => ({
      dragFree: true,
      containScroll: 'trimSnaps',
      align: 'start' as const,
      slidesToScroll: 1,
    }),
    [],
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) {
        return
      }
      setAutoScrollEnabled(false)
      emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }
    const onInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList())
    }

    onInit()
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onInit)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi || !autoScrollEnabled) {
      return
    }

    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext()
      } else {
        emblaApi.scrollTo(0)
      }
    }, AUTO_SCROLL_INTERVAL)

    return () => clearInterval(autoplay)
  }, [emblaApi, autoScrollEnabled])

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    const onPointerDown = () => {
      setAutoScrollEnabled(false)
    }

    emblaApi.on('pointerDown', onPointerDown)
    return () => {
      emblaApi.off('pointerDown', onPointerDown)
    }
  }, [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {lists.map((list) => (
            <div key={list.claim_id} className="flex-shrink-0">
              <Link
                to={getListUrl(list.vault_id, '')}
                prefetch="intent"
                className="block"
                onClick={(e) => e.stopPropagation()}
              >
                <FeaturedListCard
                  displayName={list.object?.display_name ?? ''}
                  imgSrc={list.object?.image ?? ''}
                  identitiesCount={list.object?.tag_count ?? 0}
                  // TODO: Update TVL and holders count when it becomes available. Because the list is identified by the object, the tvl and holders count are related to specific claim used for the query rather than the list itself.
                  // tvl={formatBalance(list.assets_sum ?? 0, 18)}
                  // holdersCount={list.num_positions ?? 0}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            className={cn('h-1.5 w-1.5 rounded-full', {
              'bg-primary': index === selectedIndex,
              'bg-primary/25': index !== selectedIndex,
            })}
            onClick={() => onDotButtonClick(index)}
          />
        ))}
      </div>
    </div>
  )
}
