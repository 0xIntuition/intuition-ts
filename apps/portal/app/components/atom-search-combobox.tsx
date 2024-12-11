import * as React from 'react'

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  EmptyStateCard,
  Icon,
  IconName,
} from '@0xintuition/1ui'
import { GetAtomQuery, useGetAtomsQuery } from '@0xintuition/graphql'

import { useDebounce } from '@lib/hooks/useDebounce'
import { formatEther } from 'viem'

interface AtomSearchComboboxItemProps {
  id: string | number
  name: string
  avatarSrc?: string
  value?: number
  variant?: 'user' | 'non-user'
  onClick?: () => void
  onSelect?: () => void
  attestors?: number
}

export const AtomSearchComboboxItem = ({
  id,
  name,
  avatarSrc,
  value,
  onClick,
  onSelect,
  attestors,
}: AtomSearchComboboxItemProps) => {
  return (
    <CommandItem
      key={id}
      className="border border-transparent aria-selected:bg-primary/5 aria-selected:text-primary hover:border-y-border/10 px-2.5 py-1.5 cursor-pointer [&:not(:last-child)]:border-b-border/10 group"
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
        <div className="transition-colors flex items-center gap-1 bg-foreground/10 rounded-md py-0.5 px-2 text-foreground/70 group-hover:text-foreground flex-shrink-0">
          <div className="text-sm font-medium flex items-center gap-0.5">
            <Icon name={IconName.eth} className="w-3 h-3 text-foreground" />
            {value?.toFixed(3)}
          </div>
          <span className="h-[2px] w-[2px] bg-foreground/50" />
          <div className="flex items-center gap-0.5">
            <Icon name={IconName.people} className="w-3 h-3 text-foreground" />
            {attestors}
          </div>
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
  onCreateAtomClick = () => {},
  initialValue = '',
  placeholder = 'Search for an atom...',
  ...props
}: AtomSearchComboboxProps) {
  const [searchValue, setSearchValue] = React.useState(initialValue)
  const debouncedSearch = useDebounce(searchValue, 300)
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchResults, setSearchResults] = React.useState<
    Omit<
      NonNullable<GetAtomQuery['atom']>,
      'as_subject_triples' | 'as_predicate_triples' | 'as_object_triples'
    >[]
  >([])

  const { data: atomsData, isLoading } = useGetAtomsQuery(
    {
      where: {
        label: { _ilike: `%${debouncedSearch}%` },
      },
      limit: 25,
    },
    {
      queryKey: ['atoms', debouncedSearch],
      enabled: isOpen,
    },
  )

  React.useEffect(() => {
    setSearchResults(atomsData?.atoms ?? [])
  }, [atomsData])

  const handleAtomSelect = (
    atom: Omit<
      NonNullable<GetAtomQuery['atom']>,
      'as_subject_triples' | 'as_predicate_triples' | 'as_object_triples'
    >,
  ) => {
    onAtomSelect(atom as GetAtomQuery['atom'])
    setIsOpen(false)
    setSearchValue('')
    setSearchResults([])
  }

  React.useEffect(() => {
    console.log('Atom Data:', atomsData?.atoms)
    setSearchResults(atomsData?.atoms ?? [])
  }, [atomsData])

  return (
    <div className="min-w-[320px] max-md:min-w-0 max-md:w-[90vw]" {...props}>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder={placeholder}
          value={searchValue}
          onValueChange={(value) => {
            setSearchValue(value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="text-base h-12"
        />
        <CommandList>
          <CommandEmpty>
            <EmptyStateCard
              message={isLoading ? 'Loading...' : 'No atoms found.'}
              className="border-none max-md:min-h-0 max-md:h-fit"
            />
            {!isLoading && onCreateAtomClick && (
              <Button
                variant="text"
                onClick={onCreateAtomClick}
                className="w-fit p-2.5 mt-2"
              >
                <Icon name="plus-large" className="h-4 w-4" />
                Create a new Atom
              </Button>
            )}
          </CommandEmpty>
          <CommandGroup>
            {searchResults.map((atom, index) => (
              <AtomSearchComboboxItem
                key={atom?.vault_id || index}
                id={atom?.vault_id}
                variant={atom?.type === 'Account' ? 'user' : 'non-user'}
                name={atom?.label ?? ''}
                avatarSrc={atom?.image ?? ''}
                value={
                  atom?.vault?.current_share_price
                    ? parseFloat(
                        formatEther(BigInt(atom.vault?.total_shares || 0)),
                      ) *
                      parseFloat(
                        formatEther(
                          BigInt(atom.vault?.current_share_price || 0),
                        ),
                      )
                    : undefined
                }
                attestors={atom?.vault?.position_count}
                onClick={() => handleAtomSelect(atom)}
                onSelect={() => handleAtomSelect(atom)}
              />
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
