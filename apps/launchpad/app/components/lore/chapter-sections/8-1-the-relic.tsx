import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function TheRelicSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader title="The Relic" image="/images/lore/8-the-relic.webp" />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          As you emerge from the shadow of the pyramid, the ground beneath your
          feet reveals an unexpected treasure...A schematic, faded by time yet
          pulsing with an energy that seems to bridge eons.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          This artifact, half-buried in the sand, whispers of a synthesis
          between epochs long past and those yet to dawn. What could it possibly
          be for?
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          In your grasp, your energy breathes life into the schematic, twisting
          it from paper to a living tech marvel... Lines converge, dots connect;
          a faint blue glow unveils what seems to be a map hidden within...
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Empowered by the enigmatic schematic, you embark on a journey dictated
          by your intuition and the pulsing guide in your hand. Each step,
          guided by the map&apos;s cryptic symbols, draws you deeper into the
          unknown, away from the familiar landscapes of the modern world and
          into the heart of a forgotten wilderness.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The terrain shifts under your feet, from the harsh, unforgiving sands
          to the lush, dense undergrowth of an ancient forest untouched by time.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The air here hums with a different kind of energy, ancient and pure, a
          stark contrast to the sterile hum of technology you&apos;ve left
          behind.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          As you venture further, the schematic&apos;s glow intensifies, its
          lines and dots dancing more fervently, as if excited by the proximity
          to your destination. Trusting in this technological marvel that
          bridges the past and the future, you allow your intuition to lead,
          feeling an inexplicable pull towards a hidden clearing.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          There, bathed in the ethereal light filtering through the canopy, lies
          a relic of unimaginable antiquity, its surface etched with symbols
          that resonate with the schematic&apos;s design.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          This is no mere artifact; it is a testament to a civilization that
          mastered the harmony between technology and nature, holding secrets to
          healing and understanding far beyond your wildest imaginations.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          With reverence, you approach, aware that this moment marks the
          beginning of a new chapter. The relic, now within reach, pulses with a
          welcoming warmth, as if recognizing you as its rightful discoverer.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          As your fingers brush against its ancient surface, a flood of
          knowledge and visions of the past wash over you, revealing the true
          purpose of your journey—not just a quest for treasure, but a quest for
          connection, balance, and the restoration of harmony between humanity
          and the essence of the world itself.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          In this sacred space, surrounded by the whispers of the forest and the
          wisdom of ages, you find not only the relic but also a deeper
          understanding of your place in the tapestry of existence. The journey
          ahead is clear, illuminated by the relic&apos;s presence...
          illuminated by a newfound intuition surging through your being...
        </Text>
      </div>
    </section>
  )
}
