import { FC, Fragment, ReactNode, useCallback, useEffect } from 'react'

import { CLAIMR_CONTAINER_ID, CLAIMR_SCRIPT_ID } from '@lib/utils/claimr'

interface Props {
  children: ReactNode
}

export const ClaimrWrapper: FC<Props> = ({ children }) => {
  const handle_script_creation = useCallback(() => {
    let script = document.getElementById(CLAIMR_SCRIPT_ID)

    if (!script) {
      script = document.createElement('script')
      script = document.createElement('script')

      script.setAttribute('id', CLAIMR_SCRIPT_ID)
      script.setAttribute('data-container', CLAIMR_CONTAINER_ID)
      script.setAttribute('src', 'https://widgets.claimr.io/claimr.min.js')
      script.setAttribute('data-organization', 'claimr')
      script.setAttribute('data-campaign', 'dapp')
      script.setAttribute('data-organization', 'intuition')
      script.setAttribute('data-campaign', 'launchpad')
      script.setAttribute('data-autoresize', 'true')
      script.setAttribute('data-container', CLAIMR_CONTAINER_ID)
      script.setAttribute('data-platform', 'web3')

      document.body.appendChild(script)
    }
  }, [])

  useEffect(() => {
    handle_script_creation()
  }, [handle_script_creation])

  return <Fragment>{children}</Fragment>
}
