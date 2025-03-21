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
      // If result is 0, remove the item from invalid items if it exists
      if (result === '0') {
        return prev.filter((item) => String(item[idKey]) !== String(itemId))
      }

      // If we have a non-zero result, it means there's an existing claim
      // Find the item in selectedItems that matches the itemId
      const itemToAdd = selectedItems.find(
        (item) => String(item[idKey]) === String(itemId),
      )

      // If we already have this item in invalid items, don't add it again
      if (
        !itemToAdd ||
        prev.some((item) => String(item[idKey]) === String(itemId))
      ) {
        return prev
      }

      // Add the claim ID to the item and add it to invalid items
      const itemWithClaimId = {
        ...itemToAdd,
        tagClaimId: result,
      }

      if (onRemoveItem) {
        onRemoveItem(itemId)
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
