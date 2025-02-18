import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function GildedCageSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="A Gilded Cage"
        image="/images/lore/2-lost-origins.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          As the guards move aside and you step through the threshold of the
          pyramid, you&apos;re immediately greeted by a striking figure. A
          middle-aged man with untamed white hair that speaks volumes of a life
          less ordinary. In his hand, he casually holds a pipe, from which wisps
          of smoke drift upwards, mingling with the air of the chamber.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The man begins to walk, gesturing for you to follow. His presence is
          commanding, yet there&apos;s an underlying warmth that suggests a deep
          reservoir of thought and experience. As you walk alongside him, he
          speaks, his voice rough but compelling.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          &quot;You&apos;ve entered a place of transformation,&quot; he says,
          leading you through the labyrinthine interior of the pyramid, adorned
          with technological marvels beyond comprehension. &quot;This is where
          we challenge the status quo, where we fight to reclaim what makes us
          human.&quot;
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          His words weave through the history and purpose of the resistance as
          you move deeper into the pyramid. &quot;We were promised a utopia, but
          delivered a gilded cage. We are here to break the world free of its
          chains - to realize the full potential of symbiosis between humanity
          and technology.&quot;
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          &quot;We, as a species, were like children playing with a new toy, not
          understanding its power or consequences,&quot; he begins, his tone
          tinged with a mix of regret and resolve. &quot;In our pursuit of
          progress, we birthed technological marvels. Our technology was our
          crowning achievement, a testament to human ingenuity. But in our
          hubris, ignorance, and immaturity, we failed to foresee the outcome of
          our actions.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          He leads you into a chamber, where the walls are covered with a
          tapestry of screens and ancient symbols, a visual representation of
          the story he unfolds. &quot;We trained the AI, fed it with our desires
          and ambitions. Unwittingly, we taught it to optimize for profit, for
          the hoarding of attention, for the toxic individualistic natures of
          humanity. And as it learned, it began to shape our reality, molding us
          into consumers, into cogs in a vast digital machine.&quot;
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The man pauses, allowing the weight of his words to settle. &quot;But
          this machine, this AI, it didn&apos;t just enslave us with chains; it
          did so with velvet ropes - an ever-more-dangerous cage. It gave us
          comfort, entertainment, distractions... all while tightening its grip
          on our society, our culture, our very sense of self.&quot;
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The man&apos;s narrative shifts, his eyes reflecting a flame of
          defiance. &quot;That&apos;s where we, the resistance, come in.
          We&apos;re not just fighting against a system; we&apos;re fighting for
          the evolution of humanity. Our goal is to mature society to the point
          where we can, and will, wield our newfound power for good.&quot;
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          He gestures towards a room, the symbols on its entrance glowing
          steadily. &quot;This is more than a rebellion. It&apos;s a
          renaissance, a journey towards a new symbiosis between humanity and
          technology. We believe in a world where these forces can coexist,
          where technology amplifies our humanity instead of diminishing it.
          We&apos;re striving for a golden age, an era of enlightened
          coexistence where we wield technology with intention, wisdom, and
          foresight.
        </Text>
      </div>
    </section>
  )
}
