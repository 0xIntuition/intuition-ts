import { useState } from 'react'

import { Icon, IconName } from 'components/Icon'
import { AnimatePresence, motion } from 'framer-motion'

type Node = {
  name: string
  nodes?: Node[]
}

export function FileExplorerItem({ node }: { node: Node }) {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <li key={node.name}>
      <span className="flex items-center gap-1.5 py-1">
        {node.nodes && node.nodes.length > 0 && (
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 -m-1">
            <motion.span
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="flex"
            >
              <Icon
                name={IconName.chevronRight}
                className={`size-4 text-gray-500 ${isOpen ? 'rotate-90' : ''}`}
              />
            </motion.span>
          </button>
        )}

        {node.nodes ? (
          <Icon
            name={IconName.folder}
            className={`size-6 text-sky-500 ${
              node.nodes.length === 0 ? 'ml-[22px]' : ''
            }`}
          />
        ) : (
          <Icon
            name={IconName.fileText}
            className="ml-[22px] size-6 text-foreground/50"
          />
        )}
        {node.name}
      </span>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="pl-6 overflow-hidden flex flex-col justify-end"
          >
            <ul className="pl-6">
              {node.nodes?.map((node) => (
                <FileExplorerItem node={node} key={node.name} />
              ))}
            </ul>
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  )
}
