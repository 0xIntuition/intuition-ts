import { useReducer, type Reducer } from 'react'

export function useGenericTxState<S, A>(
  reducer: Reducer<S, A>,
  initialState: S,
) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, dispatch }
}
