import { cn, Text, TextVariant } from '@0xintuition/1ui'

import { SectionHeader } from './section-header'

interface ChapterSectionProps {
  className?: string
}

export function TheContinuumSection({ className }: ChapterSectionProps) {
  return (
    <section className={cn('max-w-[70ch] mx-auto', className)}>
      <SectionHeader
        title="The Continuum"
        image="/images/lore/9-the-continuum.webp"
      />

      <div className="mx-auto space-y-6 py-6">
        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Stepping into the glaring sunlight, you power up your devices.
          It&apos;s more out of habit than desire—a ritual that&apos;s become
          second nature in this digital age. But now, something feels different.
          The familiar buzz and hum of notifications no longer provide the
          comfort they once did. Instead, they seem like the static noise of a
          chaotic symphony, an unrelenting barrage of information that seeks to
          drown you in its relentless flow.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Chaos. Insanity. Lies. The words drift through your mind like ghosts.
          You see through the veil now, piercing the illusion that cloaks the
          world. Psychological operations—dark and insidious—whisper through the
          airwaves, manipulating the masses with deft precision. There is evil
          afoot here, a malevolent force that feeds on ignorance and despair.
          Its allure is potent, pulling at your consciousness, attempting to
          drag you back into the depths of the abyss.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          But you resist. Your recent experiences have forged a new clarity
          within you. They have restored your sense of intentionality, bringing
          you back to a state of consciousness you had almost forgotten. You no
          longer allow yourself to be sucked into the echo chambers that echo
          with the same hollow voices, the same distorted truths.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          Now, you observe from afar, detached from the matrix of deceit that
          has been meticulously constructed to manipulate and control. You see
          things for what they truly are - a web of lies, intricately woven like
          the strings of puppets, making the unwitting dance to an unheard tune.
          Brother fights against brother, sister against sister—an endless,
          invisible war stoked by the embers of unnecessary conflict.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          This is the enemy, you realize. So obvious, yet so unseen by so many.
          A great force is at work, extracting freedom and sovereignty from the
          people, draining their will to resist. It is a vampiric presence,
          feeding on the very essence of humanity.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          You turn off your devices, the screen fading to black. Wading in these
          toxic waters for too long threatens to pull you under, to make you
          succumb to the same pressures that ensnare the world. You step back,
          your mind swirling with the realization of the battle ahead.
        </Text>

        <Text
          variant={TextVariant.body}
          className="leading-relaxed text-primary/70"
        >
          The story of Intuition begins to unfold before you, a tale of
          rebellion against unseen forces. You stand at the threshold of a new
          understanding, ready to embark on a journey that will challenge the
          very fabric of all you knew before…
        </Text>
      </div>
    </section>
  )
}
