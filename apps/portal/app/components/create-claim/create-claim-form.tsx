import { useEffect } from 'react'

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Text,
  TransactionStatusType,
} from '@0xintuition/1ui'

import { usePopoverStates } from '@lib/hooks/usePopoverStates'
import { FetcherWithComponents } from '@remix-run/react'
import { CreateClaimFeesType } from '@routes/resources+/create-claim'
import { TransactionActionType, TransactionStateType } from 'types'

import { ClaimAction, ClaimState } from '../../lib/hooks/useClaimState'
import { useIdentitySelection } from '../../lib/hooks/useIdentitySelection'
import ErrorList from '../error-list'
import { TransactionState } from '../transaction-state'
import CreateClaimInput from './create-claim-input'
import CreateClaimReview from './create-claim-review'
import { IdentityPopovers } from './identity-popover'

interface CreateClaimFormProps {
  fetchReval: FetcherWithComponents<unknown>
  formRef: React.MutableRefObject<null>
  state: TransactionStateType
  dispatch: React.Dispatch<TransactionActionType>
  wallet: string
  walletBalance: string
  claimFetcher: FetcherWithComponents<unknown>
  claimState: ClaimState
  claimDispatch: React.Dispatch<ClaimAction>
  fees: CreateClaimFeesType
  isLoading: boolean
}

export function CreateClaimForm({
  fetchReval,
  formRef,
  state,
  dispatch,
  wallet,
  walletBalance,
  claimFetcher,
  claimState,
  claimDispatch,
  fees,
  isLoading,
}: CreateClaimFormProps) {
  const popoverStates = usePopoverStates()

  const {
    selectedIdentities,
    setSearchQuery,
    identities,
    handleIdentitySelection,
  } = useIdentitySelection()

  useEffect(() => {
    claimDispatch({
      type: 'SET_SELECTED_IDENTITIES',
      payload: selectedIdentities,
    })
  }, [selectedIdentities, claimDispatch])

  const renderContent = () => {
    switch (state.status) {
      case 'idle':
        return (
          <>
            <DialogHeader>
              <DialogTitle>
                <Text variant="headline" className="text-foreground-secondary">
                  Make a claim about an identity
                </Text>
              </DialogTitle>
              <DialogDescription className="items-start w-full">
                <Text variant="caption" className="text-foreground/50">
                  Additional text about this.
                </Text>
              </DialogDescription>
            </DialogHeader>
            <div className="h-3/4 w-full flex items-center justify-center m-auto">
              <claimFetcher.Form method="post" action="/actions/create-claim" />
              <div className="w-full m-auto">
                <div className="flex flex-col items-center gap-10 w-full m-auto">
                  <IdentityPopovers
                    selectedIdentities={selectedIdentities}
                    identities={identities}
                    handleIdentitySelection={handleIdentitySelection}
                    setSearchQuery={setSearchQuery}
                    popoverStates={popoverStates}
                    handleInput={async (event) => {
                      const query = event.currentTarget.value
                      if (query.trim() !== '') {
                        claimDispatch({
                          type: 'SET_SEARCH_QUERY',
                          payload: query,
                        })
                      }
                    }}
                  />
                  <CreateClaimInput
                    val={claimState.initialDeposit}
                    setVal={(value) =>
                      claimDispatch({
                        type: 'SET_INITIAL_DEPOSIT',
                        payload: value,
                      })
                    }
                    wallet={wallet}
                    walletBalance={walletBalance}
                    isLoading={isLoading}
                    showErrors={claimState.showErrors}
                    setShowErrors={(show) =>
                      claimDispatch({ type: 'SET_SHOW_ERRORS', payload: show })
                    }
                    validationErrors={claimState.validationErrors}
                    setValidationErrors={(errors) =>
                      claimDispatch({
                        type: 'SET_VALIDATION_ERRORS',
                        payload: errors,
                      })
                    }
                  />
                  <ErrorList errors={claimState.validationErrors} />
                </div>
              </div>
            </div>
          </>
        )
      case 'review-transaction':
        return (
          <CreateClaimReview
            dispatch={dispatch}
            selectedIdentities={selectedIdentities}
            initialDeposit={claimState.initialDeposit}
            fees={fees}
          />
        )
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-96">
            <TransactionState
              status={state.status as TransactionStatusType}
              txHash={state.txHash}
              type="claim"
            />
          </div>
        )
    }
  }

  return (
    <>
      <fetchReval.Form
        hidden
        ref={formRef}
        action="/actions/reval"
        method="post"
      >
        <input type="hidden" name="eventName" value="create" />
      </fetchReval.Form>
      {renderContent()}
    </>
  )
}
