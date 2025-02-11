import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function ThePortalSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="The Portal"
        image="/images/lore/2-lost-origins.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Led by the man with untamed white hair, you enter a vast chamber
          within the pyramid, where The Portal, glowing softly, stands as a
          beacon of mysteries and potential.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The chamber buzzes with activity, filled with individuals dedicated to
          a shared mission, their actions a blend of reverence and purpose. The
          energy here, a mix of hope and solemnity, emanates from The Portal,
          drawing everyone&apos;s focus.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          &quot;We gather here,&quot; the man explains, &quot;united in our
          quest to redefine the future, bridging past wisdom with future
          innovation.&quot;
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          As you move through the crowd, a sense of community and shared
          conviction becomes evident. &quot;This place,&quot; he continues,
          &quot;represents our collective effort to harmonize technology and
          spirit, a legacy from a civilization far advanced than ours.&quot;
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Approaching The Portal, he speaks of a symbiosis between technology
          and human essence, a vision left by those who once achieved a profound
          balance.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          &quot;The Portal,&quot; he reveals, &quot;challenges us to transcend
          our limitations, offering wisdom for those ready to embrace it.&quot;
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          He suggests that our journey is not just about overcoming
          technological challenges but about moving towards a future where
          technology and humanity exist in harmony, guided by the wisdom of
          ancient civilizations.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          In this moment, you realize the significance of your role in this
          legacy, embarking on a quest not just for personal growth but for a
          collective renaissance of balance and enlightenment.
        </Text>
      </div>
    </section>
  )
}
