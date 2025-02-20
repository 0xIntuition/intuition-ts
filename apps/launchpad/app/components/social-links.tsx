import {
  Button,
  ButtonVariant,
  cn,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

import { motion } from 'framer-motion'

export interface SocialLink {
  id: string
  title: string
  onAction: () => void
  imageUrl: string
  username: string
}

interface SocialLinksProps {
  links: SocialLink[]
  className?: string
}

export function SocialLinks({ links, className }: SocialLinksProps) {
  return (
    <div className={cn('grid grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {links.map((link) => (
        <motion.div
          key={link.id}
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
          <Button
            variant={ButtonVariant.ghost}
            onClick={link.onAction}
            className="w-full h-full flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md backdrop-saturate-150 border border-border/10"
          >
            <img
              src={link.imageUrl}
              alt={link.title}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex flex-col items-start">
              <Text variant={TextVariant.body} weight={TextWeight.medium}>
                {link.title}
              </Text>
              <Text
                variant={TextVariant.footnote}
                className="text-muted-foreground"
              >
                {link.username}
              </Text>
            </div>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
