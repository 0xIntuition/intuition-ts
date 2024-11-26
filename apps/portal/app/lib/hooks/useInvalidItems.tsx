import { useEffect } from 'react'

import { TagLoaderData } from '@routes/resources+/tag'

interface UseInvalidItemsProps<T> {
  data: TagLoaderData
  selectedItems: T[]
  setInvalidItems: React.Dispatch<React.SetStateAction<T[]>>
  onRemoveItem?: (id: string) => void
  idKey: keyof T
  dataIdKey: 'subjectId' | 'objectId'
}

function useInvalidItems<T>({
  data,
  selectedItems,
  setInvalidItems,
  onRemoveItem,
  idKey,
  dataIdKey,
}: UseInvalidItemsProps<T>) {
  useEffect(() => {
    if (!data?.result || !data?.[dataIdKey]) {
      return
    }

    const result = data.result
    const itemId = data[dataIdKey]
    console.log('Processing invalid item', { result, itemId, selectedItems })

    const update = (prev: T[]) => {
      if (result === '0') {
        return prev.filter((item) => item[idKey] !== itemId)
      }

      if (!itemId) {
        return prev
      }

      const itemToAdd = selectedItems.find((item) => item[idKey] === itemId)
      console.log('Found item to add', { itemToAdd, itemId })

      if (!itemToAdd || prev.some((item) => item[idKey] === itemId)) {
        return prev
      }

      if (onRemoveItem) {
        onRemoveItem(itemId)
      }

      const itemWithClaimId = {
        ...itemToAdd,
        tagClaimId: result,
      }

      return [...prev, itemWithClaimId]
    }

    setInvalidItems((prev) => {
      const newState = update(prev)
      console.log('Setting invalid items', { prev, newState })
      return JSON.stringify(newState) !== JSON.stringify(prev) ? newState : prev
    })
  }, [data?.result, data?.[dataIdKey], idKey, dataIdKey, onRemoveItem])
}

export default useInvalidItems
