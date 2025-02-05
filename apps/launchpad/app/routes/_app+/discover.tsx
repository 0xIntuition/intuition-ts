import { DiscoverSection, Product } from '@components/discover-section'

export default function Discover() {
  // Mock products data based on the image
  const products: Product[] = [
    {
      id: '1',
      title: 'Interact',
      description: 'Enter the Portal',
      buttonText: 'Explore',
      onAction: () => window.open('/portal', '_blank'),
      imageUrl: 'https://placehold.co/600x400/4f46e5/ffffff?text=Portal',
    },
    {
      id: '2',
      title: 'Upload',
      description: 'Bulk Add Data to the Graph',
      buttonText: 'Upload',
      onAction: () => window.open('/upload', '_blank'),
      imageUrl: 'https://placehold.co/600x400/22c55e/ffffff?text=Upload',
    },
    {
      id: '3',
      title: 'Chrome Extension',
      description: 'Community Notes for the Web',
      buttonText: 'Download',
      onAction: () => window.open('/extension', '_blank'),
      imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=Extension',
    },
    {
      id: '4',
      title: 'Metamask Snap',
      description: 'Web3 Navigability & Security',
      buttonText: 'Download',
      onAction: () => window.open('/snap', '_blank'),
      imageUrl: 'https://placehold.co/600x400/f59e0b/ffffff?text=Metamask',
    },
    {
      id: '5',
      title: 'i7n portal',
      description: 'Knowledge GRaph Dev Interface',
      buttonText: 'Learn More',
      onAction: () => window.open('/i7n', '_blank'),
      imageUrl: 'https://placehold.co/600x400/ec4899/ffffff?text=i7n',
    },
    {
      id: '6',
      title: 'SPOC',
      description: 'Social Posts on Chain',
      buttonText: 'Learn More',
      onAction: () => window.open('/spoc', '_blank'),
      imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=SPOC',
    },
    {
      id: '7',
      title: 'Interact',
      description: 'Enter the Portal',
      buttonText: 'Explore',
      onAction: () => window.open('/portal', '_blank'),
      imageUrl: 'https://placehold.co/600x400/4f46e5/ffffff?text=Portal',
    },
    {
      id: '8',
      title: 'Upload',
      description: 'Bulk Add Data to the Graph',
      buttonText: 'Upload',
      onAction: () => window.open('/upload', '_blank'),
      imageUrl: 'https://placehold.co/600x400/22c55e/ffffff?text=Upload',
    },
    {
      id: '9',
      title: 'Chrome Extension',
      description: 'Community Notes for the Web',
      buttonText: 'Download',
      onAction: () => window.open('/extension', '_blank'),
      imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=Extension',
    },
  ]

  return (
    <div className="p-8">
      <DiscoverSection products={products} />
    </div>
  )
}
