import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function ProveYourselfSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="Prove Yourself"
        image="/images/lore/3-transcendence.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          In this newfound knowledge of what it means to be human, the silliness
          of your original &apos;Proof of Humanity&apos; presentation brings a
          smile to soul, the universe itself winking in reply. You are now ready
          to truly prove your humanness.
        </Text>
      </div>
    </section>
  )
}
