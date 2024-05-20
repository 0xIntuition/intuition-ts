import { AtomCreated as AtomCreatedEvent } from '../generated/EthMultiVault/EthMultiVault'
import { Atom } from '../generated/schema'

export function handleAtomCreated(event: AtomCreatedEvent): void {
  let entity = new Atom(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.creator = event.params.creator
  entity.atomWallet = event.params.atomWallet
  entity.atomData = event.params.atomData
  entity.vaultID = event.params.vaultID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
