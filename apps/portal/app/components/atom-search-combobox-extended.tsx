import * as React from 'react'

import {
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

import { useDebounce } from '@lib/hooks/useDebounce'
import { formatEther } from 'viem'

import { AtomType, AtomTypeSelect } from './atom-type-select'

interface AtomDetailsProps {
  atom: GetAtomQuery['atom']
}

const AtomDetails = React.memo(({ atom }: AtomDetailsProps) => {
  if (!atom) {
    return <div className="h-[360px]"></div>
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 pt-6 overflow-y-auto w-full h-[360px]">
      {atom.image ? (
        <LazyImage
          src={atom.image}
          alt={atom.label ?? ''}
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <Icon
          name={IconName.fingerprint}
          className="text-foreground/70 w-10 h-10"
        />
      )}
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-lg font-medium text-center">{atom.label}</h3>
        <Tag size={TagSize.sm}>{atom.type}</Tag>
        <p className="text-base text-foreground/70 font-medium">
          ID: {atom.vault_id}
        </p>
      </div>

      <div className="flex flex-col gap-2 py-2 px-4 rounded-lg bg-primary/5 w-full">
        <div className="flex items-center justify-between">
          <div className="text-sm text-foreground/70">TVL</div>
          <div className="text-base font-medium">
            {(
              parseFloat(formatEther(BigInt(atom.vault?.total_shares || 0))) *
              parseFloat(
                formatEther(BigInt(atom.vault?.current_share_price || 0)),
              )
            ).toFixed(4)}{' '}
            ETH
          </div>
        </div>
        <hr className="w-full border-border/10" />
        <div className="flex items-center justify-between">
          <div className="text-sm text-foreground/70">Attestors</div>
          <div className="text-base font-medium">
            {atom.vault?.position_count}
          </div>
        </div>
      </div>
    </div>
  )
})

AtomDetails.displayName = 'AtomDetails'

interface AtomSearchComboboxItemProps {
  atom: NonNullable<GetAtomQuery['atom']>
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
    const [error, setError] = React.useState(false)

    return (
      <>
        {isLoading && (
          <div className={`${className} bg-foreground/10 animate-pulse`} />
        )}
        <img
          src={src}
          alt={alt}
          className={`${className} ${isLoading ? 'hidden' : ''}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setError(true)
          }}
        />
        {error && (
          <div
            className={`${className} bg-foreground/10 flex items-center justify-center`}
          >
            <Icon
              name={IconName.fingerprint}
              className="w-1/3 h-1/3 text-foreground/50"
            />
          </div>
        )}
      </>
    )
  },
)

LazyImage.displayName = 'LazyImage'

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
        key={atom?.vault_id ?? ''}
        className={`border border-transparent aria-selected:bg-primary/10 aria-selected:text-primary px-2.5 py-2.5 cursor-pointer group rounded-md ${
          isSelected ? 'bg-primary/5 text-primary' : ''
        }`}
        onSelect={onSelect}
        data-atom-id={atom?.vault_id}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="flex items-center justify-between w-full gap-8">
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
                  #{atom?.vault_id}
                </span>
              </div>
            </div>
          </div>
          <div className="transition-colors flex items-center gap-1 bg-foreground/10 rounded-md py-0.5 px-2 text-foreground/70 group-hover:text-foreground flex-shrink-0">
            <div className="text-sm font-medium flex items-center gap-0.5">
              <Icon
                name={IconName.ethereum}
                className="w-3 h-3 text-foreground"
              />
              {atom?.vault?.current_share_price
                ? (
                    parseFloat(
                      formatEther(BigInt(atom.vault?.total_shares || 0)),
                    ) *
                    parseFloat(
                      formatEther(BigInt(atom.vault?.current_share_price || 0)),
                    )
                  ).toFixed(3)
                : undefined}
            </div>
            <span className="h-[2px] w-[2px] bg-foreground/50" />
            <div className="flex items-center gap-0.5">
              <Icon
                name={IconName.people}
                className="w-3 h-3 text-foreground"
              />
              {atom?.vault?.position_count}
            </div>
          </div>
        </div>
      </CommandItem>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.atom?.vault_id === nextProps.atom?.vault_id
    )
  },
)

AtomSearchComboboxItem.displayName = 'AtomSearchComboboxItem'

export interface AtomSearchComboboxExtendedProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onAtomSelect?: (atom: GetAtomQuery['atom']) => void
  onCreateAtomClick?: () => void
  initialValue?: string
  placeholder?: string
}

export function AtomSearchComboboxExtended({
  onAtomSelect = () => {},
  onCreateAtomClick = () => {},
  initialValue = '',
  placeholder = 'Search for an atom...',
  ...props
}: AtomSearchComboboxExtendedProps) {
  const [searchValue, setSearchValue] = React.useState(initialValue)
  const debouncedSearch = useDebounce(searchValue, 300)
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchResults, setSearchResults] = React.useState<
    Omit<
      NonNullable<GetAtomQuery['atom']>,
      'as_subject_triples' | 'as_predicate_triples' | 'as_object_triples'
    >[]
  >([])
  const [selectedAtom, setSelectedAtom] = React.useState<GetAtomQuery['atom']>()
  const [hoveredAtom, setHoveredAtom] = React.useState<GetAtomQuery['atom']>()
  const [lastHoveredAtom, setLastHoveredAtom] =
    React.useState<GetAtomQuery['atom']>()
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
      enabled: isOpen,
    },
  )

  React.useEffect(() => {
    setSearchResults(atomsData?.atoms ?? [])
  }, [atomsData])

  const handleAtomSelect = (
    atom: Omit<GetAtomQuery['atom'], 'asSubject' | 'asPredicate' | 'asObject'>,
  ) => {
    onAtomSelect(atom as GetAtomQuery['atom'])
    setSelectedAtom(atom as GetAtomQuery['atom'])
    setIsOpen(false)
    setSearchValue('')
    setSearchResults([])
  }

  const displayedAtom = (hoveredAtom ||
    lastHoveredAtom ||
    selectedAtom ||
    searchResults[0]) as NonNullable<GetAtomQuery['atom']>

  const handleMouseEnter = (atom: NonNullable<GetAtomQuery['atom']>) => {
    setHoveredAtom(atom)
    setLastHoveredAtom(atom)
  }

  const handleMouseLeave = () => {
    setHoveredAtom(undefined)
  }

  return (
    <div className="w-full max-w-3xl rounded-lg shadow-sm" {...props}>
      <Command className="relative border-border/10" shouldFilter={false}>
        <div className="flex items-center gap-2 border-b border-border/10 bg-gradient-to-b from-background to-primary/5">
          <div className="flex-1">
            <CommandInput
              placeholder={placeholder}
              value={searchValue}
              onValueChange={(value) => {
                setSearchValue(value)
                setIsOpen(true)
              }}
              onFocus={() => setIsOpen(true)}
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
              {searchResults.map((atom, index) => (
                <AtomSearchComboboxItem
                  key={atom.vault_id || index}
                  atom={atom as NonNullable<GetAtomQuery['atom']>}
                  isSelected={selectedAtom?.vault_id === atom.vault_id}
                  onSelect={() => handleAtomSelect(atom)}
                  onMouseEnter={() =>
                    handleMouseEnter(atom as NonNullable<GetAtomQuery['atom']>)
                  }
                  onMouseLeave={handleMouseLeave}
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
              onClick={onCreateAtomClick}
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
