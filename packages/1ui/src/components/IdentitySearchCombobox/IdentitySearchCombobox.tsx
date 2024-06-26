import * as React from 'react'

import { CommandGroup } from 'cmdk'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  BadgeVariant,
  Button,
  ButtonSize,
  ButtonVariant,
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Icon,
  IconName,
} from '..'

export interface IdentitySearchComboboxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onCreateIdentityClick: () => void
}

const IdentitySearchCombobox = ({
  onCreateIdentityClick,
  children,
  ...props
}: IdentitySearchComboboxProps) => {
  return (
    <div className="min-w-96" {...props}>
      <Command>
        <CommandInput placeholder="Search for an identity..." />
        <Button
          variant={ButtonVariant.text}
          size={ButtonSize.lg}
          className="gap-1.5 font-light justify-start p-3"
          onClick={onCreateIdentityClick}
        >
          <Icon name={IconName.plusLarge} className="h-4 w-4" />
          Create a new identity
        </Button>
        <CommandSeparator />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>{children}</CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}

export interface IdentitySearchComboboxItemProps {
  value: string
}

const IdentitySearchComboboxItem = ({
  value,
}: IdentitySearchComboboxItemProps) => {
  return (
    <CommandItem className="border border-transparent rounded-lg aria-selected:bg-primary/10 aria-selected:text-primary hover:border-border/30">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="test" alt="test" />
            <AvatarFallback>FR</AvatarFallback>
          </Avatar>
          <div>{value}</div>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant={BadgeVariant.social}>
            <Icon name={IconName.tag} className="h-3 w-3" />
            32
          </Badge>
          <Badge variant={BadgeVariant.default}>
            <Icon name={IconName.tag} className="h-3 w-3" />
            32
          </Badge>
        </div>
      </div>
    </CommandItem>
  )
}

export { IdentitySearchCombobox, IdentitySearchComboboxItem }
