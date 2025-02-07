import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function ForceForChangeSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="A Force for Change"
        image="/images/lore/7-ascension.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          With the Eye of Intuition, you&apos;ve become a key player in the
          intuition movement, a path unveiled within the pyramid. Your efforts
          now merge personal development with a collective goal, focusing on
          integrating technology with intuition to enhance human potential
          without losing our essence. Your projects, inspired by the
          pyramid&apos;s wisdom, serve as beacons, attracting attention and
          setting new standards for the movement.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Your work, driven by intuition, champions balance and sustainability,
          marking significant strides for the movement and drawing interest from
          a wider audience. This has not only raised the movement&apos;s profile
          but also highlighted your role as a pivotal figure, demonstrating how
          individual growth can drive societal transformation.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The movement is gaining momentum, fueled by your contributions, and
          creating unity among diverse tribes. This collaboration is pushing the
          movement towards significant achievements in both environmental
          conservation and technological innovation, resonating with communities
          and sparking wider conversations about its core values.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Your leadership and the Eye of Intuition symbolize the journey from a
          personal quest to a collective force for change, embodying the vision
          that once emerged within the pyramid&apos;s walls. In this era of
          transformation, you exemplify the impact of individual commitment on
          achieving a harmonious future.
        </Text>
      </div>
    </section>
  )
}
