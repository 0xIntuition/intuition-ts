import { useEffect } from 'react'

import { UseFetcherType } from '@remix-run/react'
import { TagLoaderData } from '@routes/resources+/tag'

interface UseInvalidItemsProps<T> {
  fetcher: UseFetcherType<TagLoaderData>
  selectedItems: T[]
  setInvalidItems: React.Dispatch<React.SetStateAction<T[]>>
  onRemoveItem?: (id: string) => void
  idKey: keyof T
  dataIdKey: 'subjectId' | 'objectId'
}

function useInvalidItems<T>({
  fetcher,
  selectedItems,
  setInvalidItems,
  onRemoveItem,
  idKey,
  dataIdKey,
}: UseInvalidItemsProps<T>) {
  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data !== undefined) {
      const result = fetcher.data.result
      const itemId = fetcher.data?.[dataIdKey]

      if (result === '0') {
        setInvalidItems((prev) => prev.filter((item) => item[idKey] !== itemId))
      } else if (itemId) {
        const itemToAdd = selectedItems.find((item) => item[idKey] === itemId)
        if (itemToAdd) {
          setInvalidItems((prev) => {
            if (prev.some((item) => item[idKey] === itemId)) {
              return prev
            }
            return [...prev, itemToAdd]
          })
          if (onRemoveItem) {
            onRemoveItem(itemId)
          }
        }
      }
    }
  }, [
    fetcher.state,
    fetcher.data,
    setInvalidItems,
    selectedItems,
    onRemoveItem,
    idKey,
    dataIdKey,
  ])
}

export default useInvalidItems
