import { useCallback, useEffect, useRef, useState } from 'react'

import { LoadingState } from '@components/loading-state'
import { usePrivy } from '@privy-io/react-auth'
import { nanoid } from 'nanoid'
import type { Abi, Address } from 'viem'
import { useSignMessage } from 'wagmi'

const SCRIPT_ID = 'claimr-script'
const CONTAINER_ID = 'CLAIMR_CONTAINER'
const SIGNATURE_KEY = 'launchpad_signatures'

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

function getSignMessage(domain: string) {
  const params = new URLSearchParams(window.location.search)
  let fullMessage = `claimr ⚡ Intuition Launchpad\n\n`
  fullMessage += `URI:\n${domain}\n\n`
  if (params.get('ref_id')) {
    fullMessage += `Referral ID:\n${params.get('ref_id')}\n\n`
  }
  fullMessage += `Nonce:\n${nanoid(16)}\n\n`
  fullMessage += `Issued At:\n${new Date().toISOString()}`
  return fullMessage
}

function getStoredSignature(
  address: string,
): { signature: string; message: string } | null {
  try {
    const signatures = JSON.parse(localStorage.getItem(SIGNATURE_KEY) || '{}')
    const data = signatures[address.toLowerCase()]
    return data ? { signature: data.signature, message: data.message } : null
  } catch {
    return null
  }
}

export default function ClaimrRoute() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { signMessageAsync } = useSignMessage()
  const { authenticated, user } = usePrivy()
  const initialized = useRef(false)
  const [isLoading, setIsLoading] = useState(true)
  const [signError, setSignError] = useState<Error | null>(null)

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

  // Handle wallet connection and signing
  useEffect(() => {
    if (!authenticated || !user?.wallet?.address || !window.claimr) {
      return
    }

    const connectWallet = async () => {
      try {
        // Double check these still exist since this is async
        if (!user?.wallet?.address || !window.claimr) {
          return
        }

        const address = user.wallet.address
        const storedData = getStoredSignature(address)

        if (!storedData && window.claimr) {
          const message = getSignMessage('https://launchpad.intuition.systems')
          const signature = await signMessageAsync({ message })

          // Save both signature and message
          try {
            const signatures = JSON.parse(
              localStorage.getItem(SIGNATURE_KEY) || '{}',
            )
            signatures[address.toLowerCase()] = { signature, message }
            localStorage.setItem(SIGNATURE_KEY, JSON.stringify(signatures))
          } catch (err) {
            console.error('Failed to save signature:', err)
          }

          window.claimr.connect_wallet(address, signature, message)
          window.claimr.set_user_token(`${address}:web3`)
        } else if (storedData && window.claimr) {
          window.claimr.connect_wallet(
            address,
            storedData.signature,
            storedData.message,
          )
          window.claimr.set_user_token(`${address}:web3`)
        }
      } catch (err) {
        console.error('Failed to sign message:', err)
        setSignError(
          err instanceof Error ? err : new Error('Failed to sign message'),
        )
      }
    }

    connectWallet()

    return () => {
      if (window.claimr) {
        window.claimr.logout()
      }
    }
  }, [authenticated, user?.wallet?.address, signMessageAsync])

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

  // Handle sign error display
  if (signError) {
    return (
      <div className="flex w-full flex-col items-center justify-start">
        <div className="w-full max-w-4xl rounded-lg border border-red-500 bg-red-100 p-4 text-red-700">
          <p>Failed to sign message: {signError.message}</p>
          <button
            onClick={() => setSignError(null)}
            className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <div className="w-full max-w-4xl">
        {!authenticated || !user?.wallet?.address ? (
          <div className="flex w-full flex-col items-center justify-center p-8">
            <div className="text-lg font-medium">
              Connect your wallet to continue
            </div>
          </div>
        ) : (
          <>
            {isLoading && <LoadingState />}
            <div
              ref={containerRef}
              id={CONTAINER_ID}
              className={isLoading ? 'hidden' : 'block'}
            />
          </>
        )}
      </div>
    </div>
  )
}
