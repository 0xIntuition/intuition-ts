import { useCallback, useEffect, useRef, useState } from 'react'

import { LoadingState } from '@components/loading-state'
import type { Abi, Address } from 'viem'
import { useAccount } from 'wagmi'

const SCRIPT_ID = 'claimr-script'
const CONTAINER_ID = 'CLAIMR_CONTAINER'
interface ClaimrRequest {
  type: string
  payload: unknown
}
declare global {
  interface Window {
    claimr?: {
      set_user_token: (token: string) => void
      set_theme: (theme: string) => void
      logout: () => void
      connect_wallet: (
        address: string,
        signature: string,
        message: string,
      ) => void
      on_request: (
        chainId: string,
        request: ClaimrRequest,
        contract: Address,
        method: string,
        args: unknown[],
        abi: Abi,
      ) => Promise<string>
    }
  }
}
export default function ClaimrRoute() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { address } = useAccount()
  const initialized = useRef(false)
  const [isLoading, setIsLoading] = useState(true)
  const handleScriptCreation = useCallback(() => {
    // Prevent multiple initializations
    if (initialized.current || !containerRef.current) {
      return
    }
    // Check if script already exists
    const existingScript = document.getElementById(SCRIPT_ID)
    if (existingScript) {
      existingScript.remove()
    }
    // Clear container
    containerRef.current.innerHTML = ''
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = 'https://widgets.claimr.io/claimr.min.js'
    script.setAttribute(
      'data-addons',
      'sup,wcc,fcm,smc,aam,mcc,shc,clt,sls,scd,rcc',
    )
    script.setAttribute('data-organization', 'intuition')
    script.setAttribute('data-campaign', 'launchpad')
    script.setAttribute('data-autoresize', 'true')
    script.setAttribute('data-container', CONTAINER_ID)
    script.setAttribute('data-platform', 'web3')
    // Event listener to detect when the widget is loaded
    script.onload = () => {
      // Give a small delay for the widget to initialize
      setTimeout(() => setIsLoading(false), 500)
    }
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(script)
        initialized.current = true
      })
    } else {
      document.body.appendChild(script)
      initialized.current = true
    }
  }, [])
  // Handle wallet connection changes
  useEffect(() => {
    if (!address || !window.claimr) {
      return
    }
    window.claimr.set_user_token(`${address}:web3`)
    return () => {
      if (window.claimr) {
        window.claimr.logout()
      }
    }
  }, [address])
  // Initialize script once
  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }
    setIsLoading(true)
    // Small delay to ensure container is mounted
    const timeoutId = setTimeout(handleScriptCreation, 100)
    return () => {
      clearTimeout(timeoutId)
      const script = document.getElementById(SCRIPT_ID)
      if (script) {
        script.remove()
      }
      initialized.current = false
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
      setIsLoading(false)
    }
  }, [handleScriptCreation])
  return (
    <div className="flex w-full flex-col items-center justify-start">
      <div className="w-full max-w-4xl">
        {isLoading && <LoadingState />}
        <div
          ref={containerRef}
          id={CONTAINER_ID}
          className={isLoading ? 'hidden' : 'block'}
        />
      </div>
    </div>
  )
}
