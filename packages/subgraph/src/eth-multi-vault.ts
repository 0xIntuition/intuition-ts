import { AtomCreated as AtomCreatedEvent } from '../generated/EthMultiVault/EthMultiVault'
import { Atom, Account } from '../generated/schema'
import { ipfs } from '@graphprotocol/graph-ts'

export function handleAtomCreated(event: AtomCreatedEvent): void {
  let entity = new Atom(event.params.vaultID.toHexString())

  let creator = Account.load(event.params.creator.toHexString())
  if (creator === null) {
    creator = new Account(event.params.creator.toHexString())
    creator.save()
  }

  entity.creator = creator.id
  entity.atomWallet = event.params.atomWallet
  entity.atomUri = event.params.atomData.toString()
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
