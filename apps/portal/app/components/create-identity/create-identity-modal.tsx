import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Icon,
  IconName,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { SmartContractForm } from '@components/create-identity/create-smart-contract'
import { InfoTooltip } from '@components/info-tooltip'

import { IdentityForm } from './create-identity-form'

export interface CreateIdentityModalProps {
  open?: boolean
  wallet?: string
  onClose: () => void
  onSuccess?: (identity: IdentityPresenter) => void
  successAction?: 'view' | 'close'
}

export default function CreateIdentityModal({
  open,
  wallet,
  onClose,
  onSuccess,
  successAction = 'view',
}: CreateIdentityModalProps) {
  const options = ['Default', 'Smart Contract']

  const [selectedAtomType, setSelectedAtomType] = useState(options[0])

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          onOpenAutoFocus={(event) => event.preventDefault()}
          className="flex flex-col max-sm:min-w-0"
        >
          <DialogHeader className="pb-1">
            <DialogTitle>
              <div className="text-foreground flex items-center gap-2">
                <Icon name={IconName.fingerprint} className="w-6 h-6" />
                Create Identity{' '}
                <InfoTooltip
                  title="Create Identity"
                  content="You are encouraged to create the best Atom/Identity you can, so that others will use it! As this Identity is interacted with, its shareholders will earn fees - so create a good one, and be the first to stake on it! Please note - you will not be able to change this data later."
                  icon={IconName.fingerprint}
                />
              </div>
            </DialogTitle>
            <Text variant="caption" className="text-muted-foreground w-full">
              In Intuition, every thing is given a unique, decentralized digital
              identifier in the form of an Atom. These &rsquo;Identities&lsquo;
              serve as conceptual anchors to which we attach and correlate data,
              experiences, and perceptions.
            </Text>
          </DialogHeader>
          <div className="flex flex-col w-full gap-1.5">
            <div className="self-stretch flex-col justify-start items-start flex">
              <div className="flex w-full items-center justify-between">
                <Text variant="caption" className="text-secondary-foreground">
                  Atom Type
                </Text>
              </div>
            </div>
            <Select
              onValueChange={(value) => {
                const selectedOption = options.find(
                  (option) => option.toLowerCase() === value,
                )
                if (selectedOption) {
                  setSelectedAtomType(selectedOption)
                }
              }}
            >
              <SelectTrigger className="w-52 max-lg:w-full">
                <SelectValue placeholder={selectedAtomType} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={option.toLowerCase()}
                    value={option.toLowerCase()}
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedAtomType === 'Smart Contract' ? (
            <SmartContractForm
              wallet={wallet}
              onClose={onClose}
              onSuccess={(identity) => {
                onSuccess?.(identity)
              }}
              successAction={successAction}
            />
          ) : (
            <IdentityForm
              wallet={wallet}
              onClose={onClose}
              onSuccess={(identity) => {
                onSuccess?.(identity)
              }}
              successAction={successAction}
            />
          )}
        </DialogContent>
      </Dialog>
    </> // TODO: [ENG-3436] -- Add AlertDialog interaction back in
  )
}
