import { useState } from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  Dialog,
  DialogContent,
  Icon,
  IconName,
  Identity,
  IdentityTag,
  Trunctacular,
} from '@0xintuition/1ui'
import { GetAtomQuery } from '@0xintuition/graphql'

import { AtomSearchCombobox } from '@components/atom-search-combobox'
import { AtomSearchCombobox2 } from '@components/atom-search-combobox2'

export default function Combobox() {
  const [selectedAtom, setSelectedAtom] = useState<GetAtomQuery['atom'] | null>(
    null,
  )
  const [searchActive, setSearchActive] = useState(false)
  const onAtomSelect = (atom: GetAtomQuery['atom']) => {
    setSelectedAtom(atom)
    setSearchActive(false)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      {selectedAtom ? (
        <IdentityTag
          size="lg"
          variant={Identity.nonUser}
          imgSrc={selectedAtom.image ?? ''}
          onClick={() => setSearchActive(true)}
        >
          <Trunctacular
            maxStringLength={20}
            variant="bodyLarge"
            value={selectedAtom?.label ?? ''}
            disableTooltip
          />
        </IdentityTag>
      ) : (
        <Button
          variant={ButtonVariant.secondary}
          size={ButtonSize.lg}
          onClick={() => setSearchActive(true)}
        >
          <Icon name={IconName.plusSmall} />
          Select an atom
        </Button>
      )}
      <Dialog
        defaultOpen
        open={searchActive}
        onOpenChange={() => {
          setSearchActive(false)
        }}
      >
        <DialogContent
          onOpenAutoFocus={(event) => event.preventDefault()}
          className="p-0 max-w-2xl"
        >
          <AtomSearchCombobox2 onAtomSelect={onAtomSelect} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
