import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function TheTransformationSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="The Transformation"
        image="/images/lore/7-ascension.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Emerging from The Portal, you&apos;re greeted by the white-haired man,
          whose knowing look affirms the profound change within you. He leads
          you through the pyramid, your surroundings familiar yet transformed by
          your journey. The vision of a world where intuition and technology
          harmonize has imprinted on you, enriching your perspective.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          He shares, &quot;Your journey explored potentialities beyond mere
          space and time, offering a glimpse of our aspiration for a harmonious
          world.&quot;
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          This conversation deepens your resolve. The unified vision and the
          impact of your efforts now feel tangible, achievable.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          At the pyramid&apos;s exit, facing the unchanged world, his words
          underscore the challenge ahead: to actualize the insights from The
          Portal in our reality, requiring action and dedication.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          With a supportive gesture, he reminds you of the collective journey
          towards transforming our world. Leaving you at the threshold,
          you&apos;re poised to re-enter the world, not just with new visions
          but with a renewed purpose to effect tangible change.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Guided by the insights gained and a collective will for a better
          future, you step forward, ready to navigate the path ahead with the
          wisdom from your journey.
        </Text>
      </div>
    </section>
  )
}
