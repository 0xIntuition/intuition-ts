import { useState } from 'react'

import {
  Badge,
  Button,
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
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { CAIP10AccountForm } from '@components/create-identity/create-caip10-account-form'
import { InfoTooltip } from '@components/info-tooltip'
import { useGetWalletBalance } from '@lib/hooks/useGetWalletBalance'
import {
  identityTransactionReducer,
  initialIdentityTransactionState,
  useTransactionState,
} from '@lib/hooks/useTransactionReducer'
import {
  IdentityTransactionActionType,
  IdentityTransactionStateType,
} from 'app/types'
import { useAccount } from 'wagmi'

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
  const { state, dispatch } = useTransactionState<
    IdentityTransactionStateType,
    IdentityTransactionActionType
  >(identityTransactionReducer, initialIdentityTransactionState)

  const options = ['Default', 'Smart Contract']

  const [selectedAtomType, setSelectedAtomType] = useState(options[0])

  const handleClose = () => {
    setSelectedAtomType(options[0])
    onClose()
  }

  const { address } = useAccount()
  const walletBalance = useGetWalletBalance(
    address ?? (wallet as `0x${string}`),
  )

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent
          onOpenAutoFocus={(event) => event.preventDefault()}
          className="flex flex-col max-sm:min-w-0 min-w-[600px]"
        >
          <>
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center justify-between w-full pr-2.5">
                  <div className="text-foreground flex items-center gap-2">
                    {state.status !== 'idle' && (
                      <Button
                        onClick={() => {
                          if (state.status === 'review-transaction') {
                            dispatch({ type: 'INITIAL_DEPOSIT' })
                          } else if (state.status === 'initial-deposit') {
                            dispatch({ type: 'START_TRANSACTION' })
                          } else {
                            dispatch({ type: 'START_TRANSACTION' })
                          }
                        }}
                        variant="ghost"
                        size="icon"
                      >
                        <Icon name={IconName.arrowLeft} className="h-4 w-4" />
                      </Button>
                    )}
                    Create Identity{' '}
                    <InfoTooltip
                      title="Create Identity"
                      content="In Intuition, every thing is given a unique, decentralized digital identifier in the form of an Atom. These &rsquo;Identities&lsquo; serve as conceptual anchors to which we attach and correlate data,experiences, and perceptions."
                      icon={IconName.fingerprint}
                    />
                  </div>
                  <Badge className="flex items-center gap-1">
                    <Icon name="wallet" className="h-3 w-3 text-secondary/50" />
                    <Text
                      variant={TextVariant.caption}
                      className="text-nowrap text-secondary/50"
                    >
                      {(+walletBalance).toFixed(2)} ETH
                    </Text>
                  </Badge>
                </div>
              </DialogTitle>
              <Text
                variant={TextVariant.caption}
                className="text-secondary/50 w-full"
              >
                Begin the process of establishing a new digital representation.
              </Text>
            </DialogHeader>
            {state.status === 'idle' && (
              <div className="flex flex-col w-full gap-1.5 mb-5">
                <div className="self-stretch flex-col justify-start items-start flex">
                  <div className="flex w-full items-center justify-between">
                    <Text
                      variant={TextVariant.caption}
                      weight={TextWeight.medium}
                    >
                      Identity Type
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
                  <SelectTrigger className="w-full">
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
            )}
          </>
          {selectedAtomType === 'Smart Contract' ? (
            <CAIP10AccountForm
              state={state}
              dispatch={dispatch}
              wallet={address ?? (wallet as `0x${string}`)}
              onClose={onClose}
              onSuccess={(identity) => {
                onSuccess?.(identity)
              }}
              successAction={successAction}
            />
          ) : (
            <IdentityForm
              state={state}
              dispatch={dispatch}
              wallet={address ?? (wallet as `0x${string}`)}
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
