import { useReducer, type Reducer } from 'react'

/**
 * This hook takes in a reducer and an initial state and returns the state and dispatch function. It's a generic hook that can be used for any reducer and initial state.
 * Without any additional configuration, it uses the default state and reducer in this file, but these can be overridden by passing in a custom reducer and initial state when needed.
 */

export function useTransactionState<S, A>(
  reducer: Reducer<S, A>,
  initialState: S,
) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, dispatch }
}
