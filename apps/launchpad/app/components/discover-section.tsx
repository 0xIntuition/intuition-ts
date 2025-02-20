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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                },
              },
              hover: {
                scale: 1.05,
                transition: {
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                },
              },
            }}
          >
            <DiscoverCard {...product} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
