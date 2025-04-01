import { nanoid } from 'nanoid'

export const CLAIMR_SCRIPT_ID = 'claimr-script'
export const CLAIMR_CONTAINER_ID = 'CLAIMR_CONTAINER'
export const CLAIMR_SIGNATURE_KEY = 'launchpad_signatures'

export interface ClaimrRequest {
  type: string
  payload: unknown
}

export function getStoredSignature(
  address: string,
): { signature: string; message: string } | null {
  try {
    const signatures = JSON.parse(
      localStorage.getItem(CLAIMR_SIGNATURE_KEY) || '{}',
    )
    const data = signatures[address.toLowerCase()]
    return data ? { signature: data.signature, message: data.message } : null
  } catch {
    return null
  }
}

export function getSignMessage(domain: string) {
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

export function saveSignature(
  address: string,
  signature: string,
  message: string,
) {
  try {
    const signatures = JSON.parse(
      localStorage.getItem(CLAIMR_SIGNATURE_KEY) || '{}',
    )
    signatures[address.toLowerCase()] = { signature, message }
    localStorage.setItem(CLAIMR_SIGNATURE_KEY, JSON.stringify(signatures))
    window.claimr?.connect_wallet(address, signature, message)
  } catch (err) {
    console.error('Failed to save signature:', err)
  }
}

// Clear Claimr signature
export function clearStoredSignature() {
  try {
    localStorage.removeItem(CLAIMR_SIGNATURE_KEY)
    window.claimr?.logout()
  } catch (err) {
    console.error('Failed to clear signature:', err)
  }
}
