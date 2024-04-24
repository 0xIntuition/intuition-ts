import React from 'react'
import { PrivyProvider } from '@privy-io/react-auth'

const ClientOnlyPrivyProvider = ({ children }: { children: React.ReactNode }) => {
  // const { ENV: env } = useLoaderData<typeof loader>()
  // console.log('env in root', env)

  return (
    <div>
      <PrivyProvider appId="clux3pbr200nrc2sexjkm8al0">
        {children}
        {/* <LoginButton /> */}
      </PrivyProvider>
    </div>
  )
}

export default ClientOnlyPrivyProvider
