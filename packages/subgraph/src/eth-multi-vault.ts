import {
  AtomCreated,
  TripleCreated,
} from '../generated/EthMultiVault/EthMultiVault'
import { Atom, Account, Triple } from '../generated/schema'
import { ipfs } from '@graphprotocol/graph-ts'

export function handleAtomCreated(event: AtomCreated): void {
  let entity = new Atom(event.params.vaultID.toString())

  let creator = Account.load(event.params.creator.toHexString())
  if (creator === null) {
    creator = new Account(event.params.creator.toHexString())
    creator.save()
  }

  entity.creator = creator.id
  entity.wallet = event.params.atomWallet
  entity.uri = event.params.atomData.toString()
  entity.data = entity.uri

  if (entity.uri.startsWith('ipfs://')) {
    const cid = entity.uri.slice(7)
    const data = ipfs.cat(cid)
    if (data !== null) {
      entity.data = data.toString()
    }
  }
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTripleCreated(event: TripleCreated): void {
  let entity = new Triple(event.params.vaultID.toString())

  let creator = Account.load(event.params.creator.toHexString())
  if (creator === null) {
    creator = new Account(event.params.creator.toHexString())
    creator.save()
  }

  entity.creator = creator.id
  entity.subject = event.params.subjectId.toString()
  entity.predicate = event.params.predicateId.toString()
  entity.object = event.params.objectId.toString()

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
