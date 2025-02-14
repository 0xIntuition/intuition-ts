import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function PyramidSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="The Pyramid"
        image="/images/lore/1-4-the-pyramid.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Choosing to resist was like stepping into a void, embracing a cause
          both formidable and essential. At dawn, under the nascent light, you
          meet the stranger at the agreed place. Their silent gesture is an
          invitation to venture forth.
        </Text>
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Together, you navigate to an unremarkable car, its appearance a mirror
          to the city&apos;s anonymity. As the urban confines recede, replaced
          by the untamed beauty of nature, the transition feels like a
          liberation from the city&apos;s digital chains.
        </Text>
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The destination emerges: a pyramid, ancient yet pulsing with an energy
          that feels both primordial and futuristic. Its surface, a seamless
          blend of stone and circuitry, tells a story of convergence—where the
          wisdom of ages past meets the promise of tomorrow.
        </Text>
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Approaching, the pyramid&apos;s hum—a sound that bridges the gap
          between energy and melody—welcomes you. It&apos;s a testament to a
          technology that transcends understanding, intertwining the past&apos;s
          wisdom with the future&apos;s possibilities.
        </Text>
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          As you approach the ancient pyramid, you&apos;re stopped by a pair of
          guards. They blend seamlessly with the surroundings, their presence
          almost undetectable until they step forward. Though their stance is
          unwavering, their eyes betray a depth of purpose; they stand not just
          as sentinels of stone, but as keepers of a deeper truth.
        </Text>
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          &quot;One word, for entry,&quot; states one, his tone resolute yet
          carrying an undercurrent of shared understanding. The simplicity of
          the request belies the weight it carries, a single utterance that
          serves as both a key and testament to your readiness to cross into the
          realm beyond.
        </Text>
      </div>
    </section>
  )
}
