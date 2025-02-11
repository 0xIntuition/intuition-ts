import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function CommonVisionSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="A Common Vision"
        image="/images/lore/6-choosing-your-path.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Stepping from the pyramid, the transformation is immediate. The once
          barren landscape now pulses with vitality, mirroring the metamorphosis
          you underwent within. The air is alive, each breath a testament to the
          realm of possibilities that now stretches before you.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Around the pyramid, a thriving community unfolds, a mosaic of
          cooperation and shared purpose, marking a departure from the world you
          left. Thousands, tens of thousands all moving with a steady
          determination. How did you not see them before?
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          This once-hidden society, with the Pyramid at its center, marries the
          ancient with the cutting-edge, creating a balance where technology
          serves, not overshadows, human and environmental well-being. A
          beautiful landscape, with architecture not in contrast to the Earth
          but a part of it, as if it was always meant to be there. A better
          version of what was once before.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          You begin to walk among them. The people, diverse in their endeavors,
          seem to be united by a common vision. Their interactions, rich with
          mutual respect, paint a picture of a society that cherishes each
          individual&apos;s role in the collective journey. Innovations and
          green spaces coexist, symbolizing a commitment to sustainability and
          community.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          This collective ethos, a reflection of the wisdom gleaned from your
          journey, has infused society with a new way of living and
          collaborating. The pyramid now anchors a community that embodies the
          harmony of intuition and technology, a testament to humanity&apos;s
          potential for growth and unity.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Witnessing this societal evolution, you grasp the ripple effect of
          your own transformation. The pyramid&apos;s legacy is not confined to
          its stone walls but resonates through the very fabric of this awakened
          society.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Faced with this vision of potential, you&apos;re imbued with hope and
          a clear purpose. The journey through the pyramid was merely the
          prologue. Now, the true mission becomes clear: to contribute to a
          future where humanity and technology coalesce, inspired by the
          profound insights from beyond the portal.
        </Text>
      </div>
    </section>
  )
}
