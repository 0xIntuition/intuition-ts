import { useCallback, useState } from 'react'

export default function useHandleCloseAttempt(onClose: () => void) {
  const [showAlertDialog, setShowAlertDialog] = useState(false)
  const [isTransactionComplete, setIsTransactionComplete] = useState(false)
  const handleCloseAttempt = useCallback(() => {
    if (isTransactionComplete) {
      onClose()
    } else {
      setShowAlertDialog(true)
    }
  }, [isTransactionComplete, onClose])

  return {
    showAlertDialog,
    setShowAlertDialog,
    isTransactionComplete,
    setIsTransactionComplete,
    handleCloseAttempt,
  }
}
