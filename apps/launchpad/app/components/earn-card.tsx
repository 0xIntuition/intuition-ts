import {
  Button,
  ButtonVariant,
  Card,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

import { Link } from '@remix-run/react'
import { motion } from 'framer-motion'
import { BrainCircuit } from 'lucide-react'

interface EarnCardProps {
  title: string
  description: string
  earnIQ: number
  buttonText: string
  icon: React.ReactNode
}

export const EarnCard = ({
  title,
  description,
  earnIQ,
  buttonText,
  icon,
}: EarnCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="relative flex flex-col rounded-lg justify-between bg-black/5 before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/5 before:via-for/10 before:to-black/5 before:-z-10 backdrop-blur-sm backdrop-saturate-150 p-6 border border-border/10 h-64">
        <div className="flex flex-col">
          <motion.div
            className="absolute left-6 top-6 border border-border/10 rounded-lg p-2.5 bg-primary/10"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="space-y-2 pt-12">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Text
                  variant={TextVariant.bodyLarge}
                  weight={TextWeight.semibold}
                  className="tracking-tight"
                >
                  {title}
                </Text>
              </motion.h3>
              <motion.p
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {description}
              </motion.p>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="flex items-center justify-between border-t border-border/10 pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <BrainCircuit className="h-5 w-5 text-primary" />
            <span className="font-medium">
              Earn {earnIQ.toLocaleString()} IQ
            </span>
          </motion.div>

          <Link to="/quests">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Button variant={ButtonVariant.secondary}>{buttonText}</Button>
            </motion.div>
          </Link>
        </motion.div>
      </Card>
    </motion.div>
  )
}
