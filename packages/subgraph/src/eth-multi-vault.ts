import { BigInt } from '@graphprotocol/graph-ts'
import {
  AtomCreated,
  TripleCreated,
  Deposited,
  FeesTransferred,
  Redeemed,
} from '../generated/EthMultiVault/EthMultiVault'
import {
  Atom,
  Account,
  Triple,
  Deposit,
  Redemption,
  FeeTransfer,
  Vault,
  Event,
} from '../generated/schema'
import { parseAtomData } from './schema.org/parser'

export function handleAtomCreated(event: AtomCreated): void {
  let atom = new Atom(event.params.vaultID.toString())

  let account = Account.load(event.params.creator.toHexString())
  if (account === null) {
    account = new Account(event.params.creator.toHexString())
    account.save()
  }

  let vault = Vault.load(event.params.vaultID.toString())
  if (vault === null) {
    vault = new Vault(event.params.vaultID.toString())
  }
  vault.atom = atom.id
  vault.save()
  atom.vault = vault.id
  atom.tvl = vault.balance

  // TODO: do we need to update the total signal?
  atom.totalSignal = atom.tvl
  atom.signals = []

  atom.creator = account.id
  atom.wallet = event.params.atomWallet
  atom.uri = event.params.atomData.toString()

  parseAtomData(atom)

  atom.blockNumber = event.block.number
  atom.blockTimestamp = event.block.timestamp
  atom.transactionHash = event.transaction.hash

  atom.save()

  let ev = new Event(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  ev.type = "AtomCreated"
  ev.atom = atom.id
  ev.blockNumber = event.block.number
  ev.blockTimestamp = event.block.timestamp
  ev.transactionHash = event.transaction.hash
  ev.save()
}

export function handleTripleCreated(event: TripleCreated): void {
  let triple = new Triple(event.params.vaultID.toString())

  let account = Account.load(event.params.creator.toHexString())
  if (account === null) {
    account = new Account(event.params.creator.toHexString())
    account.save()
  }

  let vault = Vault.load(event.params.vaultID.toString())
  if (vault === null) {
    vault = new Vault(event.params.vaultID.toString())
  }
  vault.triple = triple.id
  vault.balance = BigInt.fromI32(0)
  vault.save()
  triple.vault = vault.id

  //@ts-ignore
  let p: u8 = 255 as u8

  let invarseVaultId = BigInt.fromI32(2).pow(p).minus(BigInt.fromI32(1))
    .minus(event.params.vaultID).toString()

  let inverseVault = Vault.load(invarseVaultId)
  if (inverseVault === null) {
    inverseVault = new Vault(invarseVaultId)
  }
  inverseVault.triple = triple.id
  inverseVault.balance = BigInt.fromI32(0)
  inverseVault.save()
  triple.inverseVault = inverseVault.id

  triple.positionsCount = 0
  triple.inversePositionsCount = 0
  triple.activePositionsCount = 0
  triple.allPositionsCount = 0
  triple.tvl = vault.balance.plus(inverseVault.balance)
  triple.totalSignal = triple.tvl
  triple.signals = []
  triple.positions = []
  triple.inversePositions = []

  triple.creator = account.id
  triple.subject = event.params.subjectId.toString()
  triple.predicate = event.params.predicateId.toString()
  triple.object = event.params.objectId.toString()

  triple.blockNumber = event.block.number
  triple.blockTimestamp = event.block.timestamp
  triple.transactionHash = event.transaction.hash

  triple.save()

  let ev = new Event(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  ev.type = "TripleCreated"
  ev.triple = triple.id
  ev.blockNumber = event.block.number
  ev.blockTimestamp = event.block.timestamp
  ev.transactionHash = event.transaction.hash
  ev.save()
}



export function handleDeposited(event: Deposited): void {
  let deposit = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  let sender = Account.load(event.params.sender.toHexString())
  if (sender === null) {
    sender = new Account(event.params.sender.toHexString())
    sender.save()
  }

  let receiver = Account.load(event.params.receiver.toHexString())
  if (receiver === null) {
    receiver = new Account(event.params.receiver.toHexString())
    receiver.save()
  }

  let vault = Vault.load(event.params.id.toString())
  if (vault === null) {
    vault = new Vault(event.params.id.toString())
  }
  vault.balance = event.params.vaultBalance
  vault.save()

  deposit.vault = vault.id
  deposit.sender = sender.id
  deposit.receiver = receiver.id

  deposit.vaultBalance = event.params.vaultBalance

  deposit.userAssetsAfterTotalFees = event.params.userAssetsAfterTotalFees
  deposit.sharesForReceiver = event.params.sharesForReceiver
  deposit.entryFee = event.params.entryFee

  deposit.blockNumber = event.block.number
  deposit.blockTimestamp = event.block.timestamp
  deposit.transactionHash = event.transaction.hash

  deposit.save()

  let ev = new Event(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  ev.type = "Deposited"
  ev.deposit = deposit.id
  ev.blockNumber = event.block.number
  ev.blockTimestamp = event.block.timestamp
  ev.transactionHash = event.transaction.hash
  ev.save()

}

export function handleFeesTransferred(event: FeesTransferred): void {
  let feeTransfer = new FeeTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  let account = Account.load(event.params.sender.toHexString())
  if (account === null) {
    account = new Account(event.params.sender.toHexString())
    account.save()
  }

  feeTransfer.sender = account.id
  feeTransfer.protocolVault = event.params.protocolVault
  feeTransfer.amount = event.params.amount

  feeTransfer.blockNumber = event.block.number
  feeTransfer.blockTimestamp = event.block.timestamp
  feeTransfer.transactionHash = event.transaction.hash

  feeTransfer.save()

  let ev = new Event(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  ev.type = "FeesTransfered"
  ev.feeTransfer = feeTransfer.id
  ev.blockNumber = event.block.number
  ev.blockTimestamp = event.block.timestamp
  ev.transactionHash = event.transaction.hash
  ev.save()
}



export function handleRedeemed(event: Redeemed): void {
  let redemption = new Redemption(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  let sender = Account.load(event.params.sender.toHexString())
  if (sender === null) {
    sender = new Account(event.params.sender.toHexString())
    sender.save()
  }

  // FIXME: This is a bug, the receiver should be the reciever, not th owner. Update ABIs
  let receiver = Account.load(event.params.owner.toHexString())
  if (receiver === null) {
    receiver = new Account(event.params.owner.toHexString())
    receiver.save()
  }

  let vault = Vault.load(event.params.id.toString())
  if (vault === null) {
    vault = new Vault(event.params.id.toString())
  }
  vault.balance = event.params.vaultBalance
  vault.save()

  redemption.sender = sender.id
  redemption.receiver = receiver.id

  redemption.vaultBalance = event.params.vaultBalance
  redemption.assetsForReceiver = event.params.assetsForReceiver
  redemption.shares = event.params.shares
  redemption.exitFee = event.params.exitFee
  redemption.vault = vault.id

  redemption.blockNumber = event.block.number
  redemption.blockTimestamp = event.block.timestamp
  redemption.transactionHash = event.transaction.hash

  redemption.save()

  let ev = new Event(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  ev.type = "Redeemed"
  ev.redemption = redemption.id
  ev.blockNumber = event.block.number
  ev.blockTimestamp = event.block.timestamp
  ev.transactionHash = event.transaction.hash
  ev.save()
}



