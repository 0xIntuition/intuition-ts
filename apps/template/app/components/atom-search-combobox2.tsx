import * as React from 'react'

import {
  Avatar,
  Button,
  ButtonSize,
  ButtonVariant,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  EmptyStateCard,
  Icon,
  IconName,
  Tag,
  TagSize,
} from '@0xintuition/1ui'
import { GetAtomQuery, useGetAtomsQuery } from '@0xintuition/graphql'

import { useDebounce } from '@lib/hooks/use-debounce'
import { formatBalance } from '@lib/utils/misc'

import { AtomType, AtomTypeSelect } from './atom-type-select'

interface AtomDetailsProps {
  atom: GetAtomQuery['atom']
}

const AtomDetails = React.memo(({ atom }: AtomDetailsProps) => {
  if (!atom) return <div className="h-[360px]"></div>

  return (
    <div className="flex flex-col items-center gap-4 p-4 pt-6 overflow-y-auto w-full h-[360px]">
      {atom.image ? (
        <img
          src={atom.image}
          alt={atom.label ?? ''}
          className="h-20 w-20 rounded-xl object-cover aspect-square border border-border/10"
        />
      ) : (
        <div className="h-20 w-20 rounded-xl bg-muted border border-border/10 flex items-center justify-center">
          <Icon
            name={IconName.fingerprint}
            className="text-foreground/70 w-10 h-10"
          />
        </div>
      )}
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-lg font-medium text-center">{atom.label}</h3>
        <Tag size={TagSize.sm}>{atom.type}</Tag>
        {/* <p className="text-base text-foreground/70 font-medium">
          ID: {atom.vaultId}
        </p> */}
      </div>

      <div className="flex flex-col gap-2 py-2 px-4 rounded-lg bg-primary/5 w-full">
        <div className="flex items-center justify-between">
          <div className="text-sm text-foreground/70">TVL</div>
          <div className="text-base font-medium">
            ${formatBalance(atom.vault?.currentSharePrice ?? '0')}
          </div>
        </div>
        <hr className="w-full border-border/10" />
        <div className="flex items-center justify-between">
          <div className="text-sm text-foreground/70">Attestors</div>
          <div className="text-base font-medium">
            {atom.vault?.positionCount}
          </div>
        </div>
      </div>
    </div>
  )
})

interface AtomSearchComboboxItemProps {
  atom: GetAtomQuery['atom']
  isSelected?: boolean
  onSelect: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const LazyImage = React.memo(
  ({
    src,
    alt,
    className,
  }: {
    src: string
    alt: string
    className: string
  }) => {
    const [isLoading, setIsLoading] = React.useState(true)

    return (
      <>
        {isLoading && (
          <div className={`${className} bg-foreground/10 animate-pulse`} />
        )}
      </>
    )
  },
)

const AtomSearchComboboxItem = React.memo(
  ({
    atom,
    isSelected,
    onSelect,
    onMouseEnter,
    onMouseLeave,
  }: AtomSearchComboboxItemProps) => {
    return (
      <CommandItem
        key={atom?.vaultId ?? ''}
        className={`border border-transparent aria-selected:bg-primary/10 aria-selected:text-primary px-2.5 py-2.5 cursor-pointer group rounded-md ${
          isSelected ? 'bg-primary/5 text-primary' : ''
        }`}
        onSelect={onSelect}
        data-atom-id={atom?.vaultId}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="flex items-center gap-2 min-w-0">
          {atom?.image ? (
            <img
              src={atom.image}
              alt={atom.label ?? ''}
              className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-b from-primary/10 to-primary/5" />
          )}
          <div className="flex items-center gap-1 min-w-0 flex-1">
            <div className="text-md font-medium truncate">{atom?.label}</div>
            <div className="flex-shrink-0 flex items-center gap-1 bg-foreground/10 rounded-md py-0.5 px-1.5">
              <span className="text-sm text-foreground/70 font-medium">
                #{atom?.vaultId}
              </span>
            </div>
          </div>
        </div>
      </CommandItem>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.atom?.vaultId === nextProps.atom?.vaultId
    )
  },
)

export interface AtomSearchCombobox2Props
  extends React.HTMLAttributes<HTMLDivElement> {
  onAtomSelect?: (atom: GetAtomQuery['atom']) => void
  initialValue?: string
  placeholder?: string
}

export function AtomSearchCombobox2({
  onAtomSelect = () => {},
  initialValue = '',
  placeholder = 'Search for an atom...',
  ...props
}: AtomSearchCombobox2Props) {
  const [searchValue, setSearchValue] = React.useState(initialValue)
  const debouncedSearch = useDebounce(searchValue, 300)
  const [selectedAtom, setSelectedAtom] = React.useState<GetAtomQuery['atom']>()
  const [hoveredAtom, setHoveredAtom] = React.useState<GetAtomQuery['atom']>()
  const [selectedType, setSelectedType] = React.useState<AtomType>('All')

  const { data: atomsData, isLoading } = useGetAtomsQuery(
    {
      where: {
        label: { _ilike: `%${debouncedSearch}%` },
        ...(selectedType !== 'All' && { type: { _eq: selectedType } }),
      },
      limit: 25,
    },
    {
      queryKey: ['atoms', debouncedSearch, selectedType],
    },
  )

  const handleAtomSelect = React.useCallback(
    (atom: GetAtomQuery['atom']) => {
      setSelectedAtom(atom)
      onAtomSelect(atom)
    },
    [onAtomSelect],
  )

  const displayedAtom = hoveredAtom || selectedAtom

  return (
    <div className="w-full max-w-3xl rounded-lg shadow-sm" {...props}>
      <Command className="relative border-border/10" shouldFilter={false}>
        <div className="flex items-center gap-2 border-b border-border/10 bg-gradient-to-b from-background to-primary/5">
          <div className="flex-1">
            <CommandInput
              placeholder={placeholder}
              value={searchValue}
              onValueChange={setSearchValue}
              autoFocus
              className="border-0 px-3 "
            />
          </div>
        </div>
        <div className="flex w-full">
          <CommandList className="w-full h-[360px] border-r border-border/20 overflow-y-auto">
            <CommandEmpty>
              <EmptyStateCard
                message={isLoading ? 'Loading...' : 'No atoms found.'}
                className="border-none"
              />
            </CommandEmpty>
            <CommandGroup>
              {atomsData?.atoms.map((atom) => (
                <AtomSearchComboboxItem
                  key={atom.vaultId}
                  atom={atom as any}
                  isSelected={selectedAtom?.vaultId === atom.vaultId}
                  onSelect={() => handleAtomSelect(atom as any)}
                  onMouseEnter={() => setHoveredAtom(atom as any)}
                  onMouseLeave={() => setHoveredAtom(undefined)}
                />
              ))}
            </CommandGroup>
          </CommandList>
          <div className="w-full sticky top-0 h-full min-h-[360px]">
            <AtomDetails atom={displayedAtom} />
          </div>
        </div>
        <CommandSeparator alwaysRender />
        <CommandShortcut className="p-1">
          <div className="flex items-center justify-between gap-1">
            <Button
              variant={ButtonVariant.text}
              size={ButtonSize.default}
              className="tracking-normal border-border/10 rounded-md gap-1"
            >
              <Icon name={IconName.plusSmall} />
              Create Atom
            </Button>
            <AtomTypeSelect
              value={selectedType}
              onValueChange={setSelectedType}
            />
          </div>
        </CommandShortcut>
      </Command>
    </div>
  )
}
