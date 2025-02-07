import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function TheEpiphanySection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="The Epiphany"
        image="/images/lore/7-ascension.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          In an unexpected twist, the world you thought you navigated, filled
          with achievements and alignment with the intuition movement,
          evaporates like a vivid dream. You realize with astonishment that you
          never left The Portal; your transformative journey unfolded entirely
          within its boundless domain.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          This epiphany, though disorienting, doesn&apos;t diminish the real
          emotions and insights you gained. The Portal, more than a bridge,
          acted as a mirror to your potential, simulating what you could achieve
          by applying its lessons in the real world.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Now, within The Portal&apos;s infinite expanse, you see it not just as
          a vision of the future but as a call to action. The harmony between
          intuition and technology you envisioned is a blueprint for real-world
          application.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The Portal has tested your resolve, offering a realm where you
          explored your creativity and vision without limits. This experience
          has shown you the impact of aligning with your intuition and purpose.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          With this realization, you feel a calm determination. The
          Portal&apos;s teachings underscore the need to manifest these visions
          outside its confines. The Eye, though no longer a physical token,
          imprints its significance deeper within you, embodying insight beyond
          visual representation.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Ready to exit The Portal, you&apos;re equipped with a vision for
          integrating human intuition with technological advancement—a mission
          now yours to fulfill.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          As the infinite recedes and reality sharpens, stepping out of The
          Portal marks not a return but an entry into a new reality—one
          you&apos;ve envisioned and are now ready to actualize, turning the
          vision into action in the real world.
        </Text>
      </div>
    </section>
  )
}
