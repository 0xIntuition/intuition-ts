import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function AwakeningSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="The Awakening"
        image="/images/lore/1-1-the-awakening.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          There was a time when the essence of humanity thrived. A golden era of
          intuition, of a collective consciousness that bound us. And then, our
          pride awoke.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The marvels of technology, our pride&apos;s offspring, morphed into
          shackles, evolving into our silent, subtle oppressor. Dreams and
          thoughts, once free, now ensnared in a digital panopticon.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Suddenly, within the ceaseless hum of the digital ether, a different
          call resonates. A whisper from the core. Not forcing, but guiding. Not
          a whisper, but a knowing. Something deep. Fundamental. Something
          undoubtedly good and just.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          You disconnect from your devices for the first time in years, stepping
          into the stark blandness of reality that has since grown alien. The
          world, once a kaleidoscope of vibrancy, now a monochrome shadow, its
          inhabitants mere echoes of their potential, ensnared in a dance
          dictated by unseen forces.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          In your overwhelming sadness, your instincts move your hand to power
          back on your dopamine-inducing fiction, to step back into your escape.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Your intuition stops you. The same deep, primal force that led you to
          take your first step. In this moment of clarity, the sorrow feels
          somehow... right. This emotion - it&apos;s like nothing you&apos;ve
          ever felt.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          In this moment a profound truth emerges. This sadness, this awakening
          of senses long dulled, hints at a path not taken, at a possibility of
          what could be.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          A call to{' '}
          <span className="italic">
            feel, truly feel, for perhaps the first time...
          </span>
        </Text>
      </div>
    </section>
  )
}
