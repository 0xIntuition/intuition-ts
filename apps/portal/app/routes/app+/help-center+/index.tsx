import { IconName } from '@0xintuition/1ui'

import { SupportCardGrid } from '@components/support/support-card'
import { SupportFAQ } from '@components/support/support-faq'
import { SupportHeaderCard } from '@components/support/support-header-card'
import { SocialCardGrid } from '@components/support/support-socials'
import FullPageLayout from 'app/layouts/full-page-layout'

const supportCards = [
  {
    icon: IconName.discord,
    title: 'Discord',
    description:
      'Join our vibrant Discord community to get real-time support, connect with other users, and participate in discussions.',
    link: '#',
  },
  {
    icon: IconName.telegram,
    title: 'Telegram',
    description:
      'Stay updated and receive quick support by connecting with us on Telegram, where our team is ready to assist.',
    link: '#',
  },
  {
    icon: IconName.envelope,
    title: 'Email',
    description:
      "For personalized assistance, reach out to us via email. We're here to help with any questions or concerns.",
    link: '#',
  },
  {
    icon: IconName.megaphone,
    title: 'Feedback',
    description:
      'Use our feedback form to share your thoughts, report issues, or suggest improvements. Your input helps us make Intuition better.',
    link: '#',
  },
]

const socialCards = [
  { title: 'Medium', link: '#' },
  { title: 'Guild', link: '#' },
  { title: 'Hey', link: '#' },
  { title: 'Warpcast', link: '#' },
  { title: 'Twitter', link: '#' },
]

const faqItems = [
  {
    question: 'How do I create a claim?',
    answer:
      "To create a claim, click on the \"Create Claim\" button from your dashboard. You'll need to provide the details, including the subject, predicate, and object. After entering the information, review your claim to ensure everything is correct. Once you're ready, submit the claim, which will require confirming an on-chain transaction through your connected wallet. After submission, you'll receive a confirmation, and your claim will be tracked in your profile or dashboard.",
  },
  {
    question: 'What is staking, and how does it work?',
    answer:
      'Staking is the process of locking up your tokens to support the network and earn rewards. It works by...',
  },
  {
    question: 'How do I create and manage lists?',
    answer:
      'To create a list, go to your profile and click on "Create List". You can manage your lists by...',
  },
  {
    question: 'What are identities, and how do I create one?',
    answer:
      'Identities are unique digital representations on the Intuition network. To create an identity...',
  },
  {
    question: 'How can I follow other users?',
    answer:
      'To follow other users, visit their profile and click the "Follow" button. You can also...',
  },
  {
    question: 'What happens when I unfollow a user?',
    answer:
      "When you unfollow a user, you'll no longer see their updates in your feed. However...",
  },
]

export default function HelpCenter() {
  return (
    <FullPageLayout>
      <div className="flex flex-col max-w-7xl gap-12">
        <SupportHeaderCard
          title="Guided Tutorials to Get You Started"
          content="Dive into our guided tutorials to master the essentials of the Intuition Portal. From creating claims to staking, we’ve got you covered with easy-to-follow instructions."
          link="#"
          ctaText="Watch videos"
        />
        <SupportCardGrid supportCards={supportCards} />
        <SupportFAQ faqItems={faqItems} />
        <SocialCardGrid socialCards={socialCards} />
      </div>
    </FullPageLayout>
  )
}
