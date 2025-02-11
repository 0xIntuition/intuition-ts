import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function TheCrossroadsSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="The Crossroads"
        image="/images/lore/6-choosing-your-path.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          You encounter a crossroads of the the &apos;town&apos;, a place that
          feels as if destiny itself constructed it for you. This crossroads
          beckons a decision that mirrors your true self, blending your skills
          and passions with the essence of who you are.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Three paths lie before you, each leading to one of three minor
          pyramids, each emanating vastly different energies.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The realization that your future actions must authentically reflect
          your identity brings both clarity and challenge. The world offers
          numerous avenues to share the insights on the unity of intuition and
          technology, yet it&apos;s crucial to select a path that aligns with
          your unique talents and core values.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Your abilities, whether in storytelling, analysis, or creativity,
          suggest specific ways to disseminate your journey&apos;s lessons.
          Beyond skills, your values, passions, and vision for the future are
          key in choosing a path that resonates deeply, ensuring you can inspire
          change with authenticity and conviction.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          This moment of reflection highlights that your mission is not merely
          about spreading a message but living it, embodying balance and
          intuition in all aspects. This insight narrows your options to paths
          that truly fit your essence, whether in education, advocacy, or
          innovation.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Faced with a deeply personal yet communally impactful decision, you
          ready yourself to choose a direction that matches your skills,
          passions, and identity.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The pyramid on the left resonates with a low hum, a foundational churn
          of machinery. A vibration of{' '}
          <span className="italic">structure and logic and reason…</span>
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The pyramid in the middle resonates with a light, airy tone. A sense
          of <span className="italic">evolution, growth, and charisma…</span>
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The pyramid on the right is a mix of frequencies.
          <span className="italic">chaotic</span>, but beautiful. A mix of
          <span className="italic">creativity</span> and
          <span className="italic">innovation</span>...
        </Text>
      </div>
    </section>
  )
}
