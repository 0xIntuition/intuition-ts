import { Text, TextVariant, TextWeight } from '@0xintuition/1ui'

import { motion } from 'framer-motion'

import { DiscoverCard, DiscoverCardProps } from './discover-card'

export interface Product extends Omit<DiscoverCardProps, 'className'> {
  id: string
}

interface DiscoverSectionProps {
  products: Product[]
}

export function DiscoverSection({ products }: DiscoverSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col">
        <Text
          variant={TextVariant.heading3}
          weight={TextWeight.bold}
          className="leading-tight"
        >
          Discover our products
        </Text>
        <Text
          variant={TextVariant.body}
          weight={TextWeight.medium}
          className="text-primary/70
        "
        >
          Find out the best products for your work, life, and more.
        </Text>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DiscoverCard {...product} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
