import { useEffect, useReducer } from 'react'

import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { useFetcher } from '@remix-run/react'
import { TagLoaderData } from '@routes/resources+/tag'
import { SEARCH_IDENTITIES_RESOURCE_ROUTE } from 'consts'

export interface ClaimState {
  createdClaim: ClaimPresenter | null
  selectedIdentities: {
    subject: IdentityPresenter | null
    predicate: IdentityPresenter | null
    object: IdentityPresenter | null
  }
  claimExists: boolean
  initialDeposit: string
  searchQuery: string
  identities: IdentityPresenter[]
  showErrors: boolean
  validationErrors: string[]
}

export const initialClaimState: ClaimState = {
  createdClaim: null,
  selectedIdentities: {
    subject: null,
    predicate: null,
    object: null,
  },
  claimExists: false,
  initialDeposit: '0',
  searchQuery: '',
  identities: [],
  showErrors: false,
  validationErrors: [],
}

export type ClaimAction =
  | { type: 'SET_CREATED_CLAIM'; payload: ClaimPresenter | null }
  | {
      type: 'SET_SELECTED_IDENTITIES'
      payload: ClaimState['selectedIdentities']
    }
  | { type: 'SET_CLAIM_EXISTS'; payload: boolean }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_IDENTITIES'; payload: IdentityPresenter[] }
  | { type: 'SET_INITIAL_DEPOSIT'; payload: string }
  | { type: 'SET_SHOW_ERRORS'; payload: boolean }
  | { type: 'SET_VALIDATION_ERRORS'; payload: string[] }
  | { type: 'RESET' }

function claimReducer(state: ClaimState, action: ClaimAction): ClaimState {
  switch (action.type) {
    case 'SET_CREATED_CLAIM':
      return { ...state, createdClaim: action.payload }
    case 'SET_SELECTED_IDENTITIES':
      return { ...state, selectedIdentities: action.payload }
    case 'SET_CLAIM_EXISTS':
      return { ...state, claimExists: action.payload }
    case 'SET_INITIAL_DEPOSIT':
      return { ...state, initialDeposit: action.payload }
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload }
    case 'SET_IDENTITIES':
      return { ...state, identities: action.payload }
    case 'SET_SHOW_ERRORS':
      return { ...state, showErrors: action.payload }
    case 'SET_VALIDATION_ERRORS':
      return { ...state, validationErrors: action.payload }
    case 'RESET':
      return {
        ...initialClaimState,
        selectedIdentities: {
          subject: null,
          predicate: null,
          object: null,
        },
        createdClaim: null,
      }
    default:
      return state
  }
}

export default function useClaimState() {
  const [claimState, claimDispatch] = useReducer(
    claimReducer,
    initialClaimState,
  )
  const identitiesFetcher = useFetcher<IdentityPresenter[]>()
  const claimChecker = useFetcher<TagLoaderData>()

  useEffect(() => {
    if (claimState.searchQuery) {
      const searchParam = `?search=${encodeURIComponent(claimState.searchQuery)}`
      identitiesFetcher.load(
        `${SEARCH_IDENTITIES_RESOURCE_ROUTE}${searchParam}`,
      )
    }
  }, [claimState.searchQuery])

  useEffect(() => {
    if (identitiesFetcher.data) {
      claimDispatch({ type: 'SET_IDENTITIES', payload: identitiesFetcher.data })
    }
  }, [identitiesFetcher.data])

  useEffect(() => {
    if (
      claimState.selectedIdentities.subject &&
      claimState.selectedIdentities.predicate &&
      claimState.selectedIdentities.object
    ) {
      claimChecker.load(
        `/resources/tag?subjectId=${claimState.selectedIdentities.subject.vault_id}&predicateId=${claimState.selectedIdentities.predicate.vault_id}&objectId=${claimState.selectedIdentities.object.vault_id}`,
      )
    }
  }, [claimState.selectedIdentities])

  useEffect(() => {
    if (claimChecker.data) {
      claimDispatch({
        type: 'SET_CLAIM_EXISTS',
        payload: claimChecker.data.result !== '0',
      })
    }
  }, [claimChecker.data])

  return { claimState, claimDispatch }
}
