import { Button, ButtonVariant } from '@0xintuition/1ui'

import investorWelcomeCardBg from '@assets/investor-welcome-card-bg.png'

type Section = 'PITCH_DECK' | 'PICK_PATH' | 'PRODUCT' | 'BUSINESS' | 'JOIN'

interface NavigationItem {
  section: Section
  label: string
  onClick: () => void
}

interface NavigationMenuProps {
  activeSection: Section
  items: NavigationItem[]
}

export function NavigationMenu({ activeSection, items }: NavigationMenuProps) {
  return (
    <div className="fixed bottom-5 left-5 z-50 backdrop-blur-lg rounded-lg overflow-hidden border theme-border">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <img
          src={investorWelcomeCardBg}
          alt=""
          className="absolute w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="relative flex flex-col items-end z-10 p-2 font-medium space-y-1">
        {items.map((item, index) => (
          <Button
            key={item.section}
            variant={ButtonVariant.text}
            onClick={item.onClick}
            className={`${index !== items.length - 1 ? '' : ''} w-full justify-end uppercase tracking-widest rounded-md text-lg ${
              activeSection === item.section
                ? 'bg-primary/15 text-primary'
                : 'bg-transparent hover:bg-primary/10'
            }`}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
