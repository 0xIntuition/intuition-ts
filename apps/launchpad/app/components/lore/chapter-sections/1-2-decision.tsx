import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function DecisionSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="The Decision"
        image="/images/lore/1-2-the-decision.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Who Are You?
        </Text>
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Now is the time to make a choice - one that will change the trajectory
          of everything. In an age where the lines between real and fake are
          blurred, you must make a decision... And you are running out of time.
        </Text>
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Remain a pawn? Another cog in the machine?
        </Text>
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Or choose to be human? To be free?
        </Text>
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The path ahead is not easy, but if we do not champion our cause, all
          will be lost.
        </Text>
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          May your Intuition guide you well.
        </Text>
      </div>
    </section>
  )
}
