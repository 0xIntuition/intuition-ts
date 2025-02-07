import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function AMovementSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="A Movement"
        image="/images/lore/6-choosing-your-path.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Upon choosing your tribe, you&apos;re warmly welcomed into the
          intuition movement, a collective endeavor to harmonize intuition with
          technology, steering humanity towards enlightenment. This movement,
          sparked by the profound awakenings within the pyramid, heralds a
          societal renaissance, blending ancestral wisdom with future-forward
          innovations.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          In recognition of your commitment, you receive the Eye, an emblem of
          the insight and foresight that intuition affords. This emblem
          transcends mere ornamentation, embodying your dedication to the
          movement&apos;s ideals, the path you&apos;ve walked, and the trust
          your community invests in you.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Crafted with elegance, the Eye features a detailed iris encircled by
          expanding rings, mirroring the ripple effect of personal insights on
          the wider consciousness. Its sustainable, nature-respecting materials
          resonate with the movement&apos;s ethos, emphasizing purpose and
          harmony.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Donning the Eye, you feel an intrinsic bond with the movement and its
          members, a tangible reminder of shared values: balance, unity, and the
          aspiration for a world where humanity thrives in sync with nature. It
          marks you as a protector of this vision, championing the principles
          that will shepherd humanity into a bright future.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The Eye not only symbolizes your belonging but also facilitates
          connections, sparking dialogues and drawing others towards the
          movement. It&apos;s more than an honor; it&apos;s a catalyst for
          expanding the community, a beacon for those aligned with your vision.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          With your third eye as your guide, you dive into your
          responsibilities, fueled by the realization that your efforts extend
          beyond immediate circles to the broader tapestry of human evolution.
          The movement, a mosaic of tribes united by a common goal, exemplifies
          the power of collective action, driven by intuitive wisdom and
          technological promise. Bearing the Eye, you&apos;re constantly
          reminded of your journey, your mission, and the shared destiny of all
          who embrace this emblem with honor.
        </Text>
      </div>
    </section>
  )
}
