import * as React from 'react'

import {
  Avatar,
  Button,
  ButtonVariant,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  EmptyStateCard,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
  IconName,
  ProfileCard,
} from '@0xintuition/1ui'
import { GetAtomQuery, useGetAtomsQuery } from '@0xintuition/graphql'

import { formatBalance } from '@lib/utils/misc'

interface AtomSearchComboboxItemProps {
  id: string | number
  name: string
  avatarSrc?: string
  value?: number
  variant?: 'user' | 'non-user'
  onClick?: () => void
  onSelect?: () => void
}

const AtomSearchComboboxItem = ({
  id,
  name,
  avatarSrc,
  value,
  variant,
  onClick,
  onSelect,
}: AtomSearchComboboxItemProps) => {
  return (
    <CommandItem
      key={id}
      className="border border-transparent aria-selected:bg-primary/5 aria-selected:text-primary hover:border-y-border/10 px-2.5 py-2.5 cursor-pointer [&:not(:last-child)]:border-b-border/10 group"
      onClick={onClick}
      onSelect={onSelect}
    >
      <div className="flex items-center justify-between w-full gap-8">
        <div className="flex items-center gap-2 min-w-0">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={name}
              className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-foreground/10" />
          )}
          <div className="flex items-center gap-1 min-w-0 flex-1">
            <div className="transition-colors text-md font-medium group-hover:text-foreground truncate">
              {name}
            </div>
            {id !== undefined && (
              <div className="flex-shrink-0 flex items-center gap-1 bg-foreground/10 rounded-md py-0.5 px-1.5">
                <div className="transition-colors text-sm text-foreground/70 group-hover:text-foreground font-medium">
                  {id}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="transition-colors flex items-center gap-1 bg-foreground/10 rounded-md py-0.5 px-2 text-foreground/70 group-hover:text-foreground">
          <Icon name={IconName.arrowUp} className="w-3 h-3 text-foreground" />
          <div className="text-sm font-medium flex items-center gap-2">
            ${value?.toFixed(2)}
          </div>
          <span className="h-[2px] w-[2px] bg-foreground/50" />
          <div className="flex items-center gap-0.5">{5}</div>
        </div>
      </div>
    </CommandItem>
  )
}

export interface AtomSearchComboboxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onAtomSelect?: (atom: GetAtomQuery['atom']) => void
  onCreateAtomClick?: () => void
  initialValue?: string
  placeholder?: string
}

export function AtomSearchCombobox({
  onAtomSelect = () => {},
  onCreateAtomClick,
  initialValue = '',
  placeholder = 'Search for an atom...',
  ...props
}: AtomSearchComboboxProps) {
  const [searchValue, setSearchValue] = React.useState(initialValue)
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchResults, setSearchResults] = React.useState<any[]>([])

  const { data: atomsData, isLoading } = useGetAtomsQuery(
    {
      where: {
        label: { _ilike: `%${searchValue}%` },
      },
    },
    {
      queryKey: ['atoms', searchValue],
    },
  )

  // Update search results when data changes
  React.useEffect(() => {
    if (atomsData?.atoms) {
      setSearchResults(atomsData.atoms)
    }
  }, [atomsData])

  const handleAtomSelect = (atom: any) => {
    onAtomSelect(atom)
    setIsOpen(false)
    setSearchValue('')
    setSearchResults([])
  }

  return (
    <div className="min-w-96 max-md:min-w-0 max-md:w-[90vw]" {...props}>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder={placeholder}
          value={searchValue}
          onValueChange={setSearchValue}
          onFocus={() => setIsOpen(true)}
        />
        {isOpen && (
          <CommandList>
            <CommandEmpty>
              <EmptyStateCard
                message={isLoading ? 'Loading...' : 'No atoms found.'}
                className="border-none max-md:min-h-0 max-md:h-fit"
              />
            </CommandEmpty>
            <CommandGroup className="p-0">
              {searchResults.map((atom) => (
                <AtomSearchComboboxItem
                  id={atom.vaultId}
                  variant={atom.type === 'Account' ? 'user' : 'non-user'}
                  name={atom.label ?? ''}
                  avatarSrc={atom.image ?? ''}
                  value={
                    atom.vault?.currentSharePrice
                      ? +formatBalance(atom.vault?.currentSharePrice)
                      : undefined
                  }
                  onClick={() => handleAtomSelect(atom)}
                  onSelect={() => handleAtomSelect(atom)}
                />
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  )
}
