import { Text, TextVariant, TextWeight } from '@0xintuition/1ui'

import { DiscoverSection, Product } from '@components/discover-section'
import { PageHeader } from '@components/page-header'
import { SocialLink, SocialLinks } from '@components/social-links'
import { motion } from 'framer-motion'

export default function Discover() {
  // Social links data (items 14-22)
  const socialLinks: SocialLink[] = [
    {
      id: '14',
      title: 'Github',
      username: '0xintuition',
      onAction: () => window.open('https://github.com/0xIntuition', '_blank'),
      imageUrl: '/images/discover/social/github.webp',
    },
    {
      id: '15',
      title: 'Twitter',
      username: '0xintuition',
      onAction: () => window.open('https://twitter.com/0xintuition', '_blank'),
      imageUrl: '/images/discover/social/twitter.webp',
    },
    {
      id: '16',
      title: 'Telegram',
      username: 'intuitionsystems',
      onAction: () => window.open('http://t.me/intuitionsystems', '_blank'),
      imageUrl: '/images/discover/social/telegram.webp',
    },
    {
      id: '17',
      title: 'Discord',
      username: '0xintuition',
      onAction: () => window.open('https://discord.gg/0xintuition', '_blank'),
      imageUrl: '/images/discover/social/discord.webp',
    },
    {
      id: '18',
      title: 'Medium',
      username: '0xintuition',
      onAction: () => window.open('https://medium.com/0xintuition', '_blank'),
      imageUrl: '/images/discover/social/medium.webp',
    },
    {
      id: '19',
      title: 'Guild',
      username: 'intuition',
      onAction: () => window.open('https://guild.xyz/intuition', '_blank'),
      imageUrl: '/images/discover/social/guild.webp',
    },
    {
      id: '20',
      title: 'Mirror',
      username: 'intuition',
      onAction: () =>
        window.open(
          'https://mirror.xyz/0x0bcAFff6B45769B53DE34169f08AB220d2b9F910',
          '_blank',
        ),
      imageUrl: '/images/discover/social/mirror.webp',
    },
    {
      id: '21',
      title: 'Warpcast',
      username: 'intuition',
      onAction: () => window.open('https://warpcast.com/intuition', '_blank'),
      imageUrl: '/images/discover/social/warpcast.webp',
    },
    // {
    //   id: '22',
    //   title: 'LinkedIn',
    //   description: 'Join the Intuition community',
    //   buttonText: 'Join',
    //   onAction: () =>
    //     window.open('https://www.linkedin.com/company/0xintuition/', '_blank'),
    //   imageUrl: '/images/discover/social/linkedin.webp',
    // },
  ]

  // Products data (items 1-13)
  const products: Product[] = [
    {
      id: '0',
      title: 'Ecosystems',
      description: 'Decentralized map of blockchain ecosystems',
      buttonText: 'Explore',
      onAction: () =>
        window.open('https://ecosystems.intuition.systems/', '_blank'),
      imageUrl: '/images/discover/ecosystems.png',
    },
    {
      id: '1',
      title: 'The Portal',
      description: 'The first Intuition explorer',
      buttonText: 'Explore',
      onAction: () =>
        window.open('https://portal.intuition.systems/', '_blank'),
      imageUrl: '/images/discover/portal.webp',
    },
    {
      id: '2',
      title: 'Upload',
      description: 'Bulk data upload tool',
      buttonText: 'Upload',
      onAction: () =>
        window.open('https://www.upload.intuition.systems/', '_blank'),
      imageUrl: '/images/discover/upload.webp',
    },
    {
      id: '3',
      title: 'Chrome Extension',
      description: `Decentralized 'community notes' for the entire web`,
      buttonText: 'Download',
      onAction: () =>
        window.open(
          'https://github.com/0xIntuition/chrome-extension/',
          '_blank',
        ),
      imageUrl: '/images/discover/extension.webp',
    },
    {
      id: '4',
      title: 'Raycast Extension',
      description: `Bring your Intuition to Raycast`,
      buttonText: 'Download',
      onAction: () =>
        window.open(
          'https://github.com/0xIntuition/intuition-raycast',
          '_blank',
        ),
      imageUrl: '/images/discover/extension.webp',
    },
    {
      id: '5',
      title: 'Slack Bot',
      description: `Bring your Intuition to Slack`,
      buttonText: 'Download',
      onAction: () =>
        window.open('https://github.com/0xIntuition/intuition-slack', '_blank'),
      imageUrl: '/images/discover/slack-bot.webp',
    },
    {
      id: '6',
      title: 'Metamask Snap',
      description: 'Bring your Intuition to Metamask',
      buttonText: 'Learn More',
      onAction: () =>
        window.open('https://intuition-snap.onrender.com/', '_blank'),
      imageUrl: '/images/discover/metamask.webp',
    },
    {
      id: '14',
      title: 'Ethereum Values',
      description:
        'Propose Values, Vote with ETH, Earn Rewards, Shape the future',
      buttonText: 'Explore',
      onAction: () =>
        window.open('https://ethereum-values.consensys.io/', '_blank'),
      imageUrl: '/images/discover/consensys-ethereum-values.png',
    },
    {
      id: '15',
      title: 'Tyris',
      description: 'Crypto-focused data feed delivering real-time insights',
      buttonText: 'Explore',
      onAction: () => window.open('https://tyris.cyphercore.io/', '_blank'),
      imageUrl: '/images/discover/tyris.png',
    },
    {
      id: '7',
      title: 'SPOC',
      description: 'Social Posts on Chain',
      buttonText: 'Learn More',
      onAction: () => window.open('https://www.hellospoc.com/', '_blank'),
      imageUrl: '/images/discover/spoc.webp',
    },
    {
      id: '9',
      title: 'Collections',
      description: 'Create Lists. Share Insights. Earn Together.',
      buttonText: 'Learn More',
      onAction: () => window.open('https://collections.systems', '_blank'),
      imageUrl: '/images/discover/collections.webp',
    },
    {
      id: '10',
      title: 'RepuStation',
      description: 'Social creditiblity meets on-chain transparency',
      buttonText: 'Learn More',
      onAction: () => window.open('https://www.repustation.xyz', '_blank'),
      imageUrl: '/images/discover/repustation.webp',
    },
    {
      id: '11',
      title: 'Whitepaper',
      description: 'Read the intuition whitepaper',
      buttonText: 'Download',
      onAction: () =>
        window.open(
          'https://cdn.prod.website-files.com/65cdf366e68587fd384547f0/66ccda1f1b3bbf2d30c4f522_intuition_whitepaper.pdf',
          '_blank',
        ),
      imageUrl: '/images/discover/whitepaper.webp',
    },
    {
      id: '12',
      title: 'Litepaper',
      description: 'Read the intuition litepaper',
      buttonText: 'Download',
      onAction: () =>
        window.open(
          'https://cdn.prod.website-files.com/65cdf366e68587fd384547f0/6758a6296b2770b26226b940_intuition_litepaper.pdf',
          '_blank',
        ),
      imageUrl: '/images/discover/litepaper.webp',
    },
    {
      id: '13',
      title: 'Documentation',
      description: 'Read the intuition litepaper',
      buttonText: 'Download',
      onAction: () => window.open('https://docs.intuition.systems/', '_blank'),
      imageUrl: '/images/discover/documentation.webp',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-12"
    >
      <PageHeader
        title="Discover"
        subtitle="Our ecosystem is working together to build a more intuitive Web3 experience"
      />

      <div className="space-y-12">
        <DiscoverSection products={products} />

        <div className="space-y-4">
          <Text variant={TextVariant.heading4} weight={TextWeight.semibold}>
            Find your tribe
          </Text>
          <SocialLinks links={socialLinks} />
        </div>
      </div>
    </motion.div>
  )
}
