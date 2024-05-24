import {
  AtomCreated,
  TripleCreated,
} from '../generated/EthMultiVault/EthMultiVault'
import { Atom, Account, Triple } from '../generated/schema'
import { parseAtomData } from './schema.org/parser'

export function handleAtomCreated(event: AtomCreated): void {
  let atom = new Atom(event.params.vaultID.toString())

  let account = Account.load(event.params.creator.toHexString())
  if (account === null) {
    account = new Account(event.params.creator.toHexString())
    account.save()
  }

  atom.creator = account.id
  atom.wallet = event.params.atomWallet
  atom.uri = event.params.atomData.toString()

  parseAtomData(atom)

  atom.blockNumber = event.block.number
  atom.blockTimestamp = event.block.timestamp
  atom.transactionHash = event.transaction.hash

  atom.save()
}

export function handleTripleCreated(event: TripleCreated): void {
  let triple = new Triple(event.params.vaultID.toString())

  let account = Account.load(event.params.creator.toHexString())
  if (account === null) {
    account = new Account(event.params.creator.toHexString())
    account.save()
  }

  triple.creator = account.id
  triple.subject = event.params.subjectId.toString()
  triple.predicate = event.params.predicateId.toString()
  triple.object = event.params.objectId.toString()

  triple.blockNumber = event.block.number
  triple.blockTimestamp = event.block.timestamp
  triple.transactionHash = event.transaction.hash

  triple.save()
}
