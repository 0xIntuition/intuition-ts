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

    setInvalidItems((prev) => {
      if (result === '0') {
        return prev.filter((item) => item[idKey] !== itemId)
      }

      if (!itemId) {
        return prev
      }

      const itemToAdd = selectedItems.find((item) => item[idKey] === itemId)

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
    })
  }, [
    data?.result,
    data?.[dataIdKey],
    selectedItems,
    idKey,
    dataIdKey,
    onRemoveItem,
  ])
}

export default useInvalidItems
