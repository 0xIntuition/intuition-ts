import { Button, Text } from '@0xintuition/1ui'

interface TopicsStepProps {
  onNext: () => void
  onBack: () => void
  selectedWallet: string | null
  onSelectWallet: (walletId: string) => void
}

const WALLETS = [
  { id: 'metamask', name: 'MetaMask' },
  { id: 'coinbase', name: 'Coinbase Wallet' },
  { id: 'rainbow', name: 'Rainbow' },
  { id: 'trust', name: 'Trust Wallet' },
]

export function TopicsStep({
  onNext,
  onBack,
  selectedWallet,
  onSelectWallet,
}: TopicsStepProps) {
  return (
    <div className="p-8">
      <Text variant="headline" className="text-center mb-8">
        What is your preferred Web3 Wallet?
      </Text>
      <div className="grid grid-cols-2 gap-4">
        {WALLETS.map((wallet) => (
          <button
            key={wallet.id}
            onClick={() => onSelectWallet(wallet.id)}
            aria-pressed={selectedWallet === wallet.id}
            className={`flex items-center gap-4 rounded-lg border transition-colors w-[280px] h-[72px] ${
              selectedWallet === wallet.id
                ? 'border-accent bg-accent/10'
                : 'border-[#1A1A1A] hover:border-accent'
            }`}
          >
            <div className="w-14 h-14 rounded bg-[#1A1A1A] flex-shrink-0 ml-1" />
            <div className="text-left">
              <Text variant="body" className="text-white">
                {wallet.name}
              </Text>
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="secondary"
          onClick={onNext}
          className="bg-[#1A1A1A]"
          disabled={!selectedWallet}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
