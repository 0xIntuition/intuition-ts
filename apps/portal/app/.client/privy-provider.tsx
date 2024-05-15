import { PrivyProvider } from '@privy-io/react-auth'
import React from 'react'

const ClientOnlyPrivyProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div>
      <PrivyProvider appId="clux3pbr200nrc2sexjkm8al0">
        {children}
      </PrivyProvider>
    </div>
  )
}

export default ClientOnlyPrivyProvider
