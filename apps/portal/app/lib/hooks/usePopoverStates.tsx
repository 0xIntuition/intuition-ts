import { useState } from 'react'

export const usePopoverStates = () => {
  const [isSubjectPopoverOpen, setIsSubjectPopoverOpen] = useState(false)
  const [isPredicatePopoverOpen, setIsPredicatePopoverOpen] = useState(false)
  const [isObjectPopoverOpen, setIsObjectPopoverOpen] = useState(false)

  const closeAllPopovers = () => {
    setIsSubjectPopoverOpen(false)
    setIsPredicatePopoverOpen(false)
    setIsObjectPopoverOpen(false)
  }

  return {
    isSubjectPopoverOpen,
    setIsSubjectPopoverOpen,
    isPredicatePopoverOpen,
    setIsPredicatePopoverOpen,
    isObjectPopoverOpen,
    setIsObjectPopoverOpen,
    closeAllPopovers,
  }
}
