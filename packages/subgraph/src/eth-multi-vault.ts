import {
  AtomCreated,
  TripleCreated,
  Deposited,
  FeesTransferred,
  Redeemed,
} from '../generated/EthMultiVault/EthMultiVault'
import { Atom, Account, Triple, Deposit, Redemption, FeeTransfer } from '../generated/schema'
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



export function handleDeposited(event: Deposited): void {
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  let account = Account.load(event.params.sender.toHexString())
  if (account === null) {
    account = new Account(event.params.sender.toHexString())
    account.save()
  }

  entity.sender = account.id

  entity.receiver = event.params.receiver
  entity.vaultBalance = event.params.vaultBalance
  entity.userAssetsAfterTotalFees = event.params.userAssetsAfterTotalFees
  entity.sharesForReceiver = event.params.sharesForReceiver
  entity.entryFee = event.params.entryFee
  entity.EthMultiVault_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeesTransferred(event: FeesTransferred): void {
  let entity = new FeeTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  let account = Account.load(event.params.sender.toHexString())
  if (account === null) {
    account = new Account(event.params.sender.toHexString())
    account.save()
  }

  entity.sender = account.id
  entity.protocolVault = event.params.protocolVault
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}



export function handleRedeemed(event: Redeemed): void {
  let entity = new Redemption(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.owner = event.params.owner
  entity.vaultBalance = event.params.vaultBalance
  entity.assetsForReceiver = event.params.assetsForReceiver
  entity.shares = event.params.shares
  entity.exitFee = event.params.exitFee
  entity.EthMultiVault_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}



