import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function DeeperTruthSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="A Deeper Truth"
        image="/images/lore/3-transcendence.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          As you present your Proof of Humanity, the universe peels back a
          layer, revealing a deeper truth about what it means to be human. The
          idea of distilling humanity into something tangible fades, giving way
          to an appreciation for the rich, complex essence of human experience.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          This moment isn&apos;t about criticism but a profound realization:
          humanity is defined not by documents or tangible proofs but by the
          intricate web of experiences and emotions that color our lives.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Emotions—joy, sorrow, love, fear—become the vibrant hues that add
          depth and meaning to your existence, transcending mere reactions to
          embody the core of your being.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Creativity emerges as a hallmark of human ingenuity, manifesting not
          just in monumental achievements but in everyday problem-solving,
          boundary-pushing dreams, and innovative solutions to the challenges
          faced.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The relationships that connect you to others highlight the fundamental
          interconnectedness of human life, weaving a supportive network that
          enriches and defines your journey.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Your capacity for self-reflection, questioning your place in the
          universe and striving for greater understanding, marks the human
          pursuit of deeper insight and transcendence.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Adaptability and resilience, the ability to navigate and grow from
          challenges, underscore the dynamic, evolving nature of human
          existence, showcasing our capacity for continuous self-improvement.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          In this exchange with the cosmos, you recognize that &apos;proof of
          humanity&apos; is more than distinguishing oneself from the universe
          or other entities. It&apos;s an embrace of the human condition in its
          entirety—imperfect, beautiful, fragile, yet enduring. This journey,
          with its quest for meaning, connection, and growth, is a testament to
          the rich narrative of what it means to be human, a dance with the
          universe that reveals the profound essence of our existence.
        </Text>
      </div>
    </section>
  )
}
