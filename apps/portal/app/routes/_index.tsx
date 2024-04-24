import { Button } from '@intuition-ts/1design'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

export default function Index() {
  return (
    <div>
      <ConnectButton
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
      />{' '}
      <Button />
    </div>
  )
}
