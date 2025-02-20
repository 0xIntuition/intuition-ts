import { DiscoverSection, Product } from '@components/discover-section'

export default function Discover() {
  // Mock products data based on the image
  const products: Product[] = [
    {
      id: '1',
      title: 'The Portal',
      description: 'The first Intuition explorer',
      buttonText: 'Explore',
      onAction: () =>
        window.open('https://beta.portal.intuition.systems/', '_blank'),
      imageUrl: 'https://placehold.co/600x400/4f46e5/ffffff?text=The Portal',
    },
    {
      id: '2',
      title: 'Upload',
      description: 'Bulk data upload tool',
      buttonText: 'Upload',
      onAction: () =>
        window.open('https://www.upload.intuition.systems/', '_blank'),
      imageUrl: 'https://placehold.co/600x400/22c55e/ffffff?text=Upload',
    },
    {
      id: '3',
      title: 'Chrome Extension',
      description: `Decentralized 'community notes' for the entire internet`,
      buttonText: 'Download',
      onAction: () =>
        window.open('https://github.com/0xIntuition/trustbar/', '_blank'),
      imageUrl:
        'https://placehold.co/600x400/3b82f6/ffffff?text=Chrome Extension',
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
      imageUrl:
        'https://placehold.co/600x400/3b82f6/ffffff?text=Raycast Extension',
    },
    {
      id: '5',
      title: 'Slack Bot',
      description: `Bring your Intuition to Slack`,
      buttonText: 'Download',
      onAction: () =>
        window.open('https://github.com/0xIntuition/intuition-slack', '_blank'),
      imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=Slack Bot',
    },
    {
      id: '6',
      title: 'Metamask Snap',
      description: 'Bring your Intuition to Metamask',
      buttonText: 'Learn More',
      onAction: () =>
        window.open('https://intuition-snap.onrender.com/', '_blank'),
      imageUrl: 'https://placehold.co/600x400/f59e0b/ffffff?text=Metamask',
    },
    {
      id: '7',
      title: 'SPOC',
      description: 'Social Posts on Chain',
      buttonText: 'Learn More',
      onAction: () => window.open('https://www.hellospoc.com/', '_blank'),
      imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=SPOC',
    },
    {
      id: '8',
      title: 'ValueSys',
      description: 'Community values platform by ConsenSys',
      buttonText: 'Learn More',
      onAction: () => window.open('#', '_blank'),
      imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=ValueSys',
    },
    {
      id: '9',
      title: 'Collections',
      description: 'Create Lists. Share Insights. Earn Together.',
      buttonText: 'Learn More',
      onAction: () => window.open('https://collections.systems', '_blank'),
      imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Collections',
    },
    {
      id: '10',
      title: 'RepuStation',
      description: 'Social creditiblity meets on-chain transparency',
      buttonText: 'Learn More',
      onAction: () => window.open('https://www.repustation.xyz', '_blank'),
      imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=RepuStation',
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
      imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Whitepaper',
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
      imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Litepaper',
    },
    {
      id: '13',
      title: 'Documentation',
      description: 'Read the intuition litepaper',
      buttonText: 'Download',
      onAction: () => window.open('https://docs.intuition.systems/', '_blank'),
      imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Documentation',
    },
    {
      id: '14',
      title: 'Github',
      description: 'Keep up to date with the latest Intuition developments',
      buttonText: 'Learn More',
      onAction: () => window.open('https://github.com/0xIntuition', '_blank'),
      imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Github',
    },
    {
      id: '15',
      title: 'Twitter',
      description: 'Follow the latest Intuition developments',
      buttonText: 'Follow',
      onAction: () => window.open('https://twitter.com/0xintuition', '_blank'),
      imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Twitter',
    },
    {
      id: '16',
      title: 'Telegram',
      description: 'Join the Intuition community',
      buttonText: 'Join',
      onAction: () => window.open('http://t.me/intuitionsystems', '_blank'),
      imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Telegram',
    },
    {
      id: '17',
      title: 'Discord',
      description: 'Join the Intuition community',
      buttonText: 'Join',
      onAction: () => window.open('https://discord.gg/0xintuition', '_blank'),
      imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Discord',
    },
    {
      id: '18',
      title: 'Medium',
      description: 'Read the latest Intuition developments',
      buttonText: 'Read',
      onAction: () => window.open('https://medium.com/@0xintuition', '_blank'),
      imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Medium',
    },
    {
      id: '19',
      title: 'Guild',
      description: 'Join the Intuition community',
      buttonText: 'Join',
      onAction: () => window.open('https://guild.xyz/intuition', '_blank'),
      imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Guild',
    },
    {
      id: '20',
      title: 'Mirror',
      description: 'Read the latest Intuition developments',
      buttonText: 'Read',
      onAction: () =>
        window.open(
          'https://mirror.xyz/0x0bcAFff6B45769B53DE34169f08AB220d2b9F910',
          '_blank',
        ),
      imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Mirror',
    },
    {
      id: '21',
      title: 'Warpcast',
      description: 'Join the Intuition community',
      buttonText: 'Join',
      onAction: () => window.open('https://warpcast.com/intuition', '_blank'),
      imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Warpcast',
    },
    {
      id: '22',
      title: 'LinkedIn',
      description: 'Join the Intuition community',
      buttonText: 'Join',
      onAction: () =>
        window.open('https://www.linkedin.com/company/0xintuition/', '_blank'),
      imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=LinkedIn',
    },
  ]
  return (
    <>
      <DiscoverSection products={products} />
    </>
  )
}
