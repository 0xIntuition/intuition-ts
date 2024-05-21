import { AtomCreated as AtomCreatedEvent } from '../generated/EthMultiVault/EthMultiVault'
import { Atom } from '../generated/schema'
import { ipfs } from '@graphprotocol/graph-ts'

export function handleAtomCreated(event: AtomCreatedEvent): void {
  let entity = new Atom(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.creator = event.params.creator
  entity.atomWallet = event.params.atomWallet
  entity.atomUri = event.params.atomData.toString()
  entity.vaultID = event.params.vaultID
  entity.atomData = entity.atomUri

  if (entity.atomUri.startsWith('ipfs://')) {
    const cid = entity.atomUri.slice(7)
    const data = ipfs.cat(cid)
    if (data !== null) {
      entity.atomData = data.toString()
    }
  }
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
