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
  Position,
  AtomValue,
} from '../generated/schema'
import { parseAtomData } from './schema.org/parser'

export function handleAtomCreated(event: AtomCreated): void {
  let atom = new Atom(event.params.vaultID.toString())

  let account = Account.load(event.params.creator.toHexString())
  if (account === null) {
    account = new Account(event.params.creator.toHexString())
    account.label = account.id
  }

  let vault = Vault.load(event.params.vaultID.toString())
  if (vault === null) {
    vault = new Vault(event.params.vaultID.toString())
    vault.totalShares = BigInt.fromI32(0)
  }
  vault.atom = atom.id
  vault.save()
  atom.vault = vault.id

  // TODO: do we need to update the total signal?
  atom.totalSignal = vault.totalShares
  atom.signals = []

  atom.creator = account.id
  atom.wallet = event.params.atomWallet
  atom.uri = event.params.atomData.toString()

  parseAtomData(atom)

  if (atom.uri.toLowerCase() == account.id.toLowerCase()) {
    atom.type = "Account"
    atom.emoji = "⛓️"
    atom.label = account.id.toString()
    let atomValue = new AtomValue(atom.id)
    atomValue.account = account.id
    atomValue.save()
    atom.value = atomValue.id
    account.atom = atom.id

  }
  account.save()

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
    account.label = account.id
  }

  let vault = Vault.load(event.params.vaultID.toString())
  if (vault === null) {
    vault = new Vault(event.params.vaultID.toString())
    vault.totalShares = BigInt.fromI32(0)
  }
  vault.triple = triple.id
  vault.save()
  triple.vault = vault.id

  //@ts-ignore
  let invarseVaultId = BigInt.fromI32(2).pow(255 as u8).times(BigInt.fromI32(2)).minus(BigInt.fromI32(1))
    .minus(event.params.vaultID).toString()

  let inverseVault = Vault.load(invarseVaultId)
  if (inverseVault === null) {
    inverseVault = new Vault(invarseVaultId)
  }
  inverseVault.triple = triple.id
  inverseVault.totalShares = BigInt.fromI32(0)
  inverseVault.save()
  triple.inverseVault = inverseVault.id

  triple.positionsCount = 0
  triple.inversePositionsCount = 0
  triple.activePositionsCount = 0
  triple.allPositionsCount = 0
  triple.tvl = vault.totalShares.plus(inverseVault.totalShares)
  triple.totalSignal = triple.tvl
  triple.signals = []
  triple.positions = []
  triple.inversePositions = []

  triple.creator = account.id
  triple.subject = event.params.subjectId.toString()
  triple.predicate = event.params.predicateId.toString()
  triple.object = event.params.objectId.toString()

  let subject = Atom.load(event.params.subjectId.toString())
  let predicate = Atom.load(event.params.predicateId.toString())
  let object = Atom.load(event.params.objectId.toString())


  if (subject !== null && predicate !== null && object !== null) {
    if (subject.type == "Account" && predicate.type == "PersonPredicate" && object.type == "Person") {
      if (subject.uri.toLowerCase() == account.id.toLowerCase()) {
        account.label = object.label
        account.image = object.image
      }
    }
  }
  account.save()

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
    sender.label = sender.id
    sender.save()
  }

  let receiver = Account.load(event.params.receiver.toHexString())
  if (receiver === null) {
    receiver = new Account(event.params.receiver.toHexString())
    receiver.label = receiver.id
    receiver.save()
  }

  let vault = Vault.load(event.params.vaultId.toString())
  if (vault === null) {
    vault = new Vault(event.params.vaultId.toString())
    vault.totalShares = BigInt.fromI32(0)
  }
  vault.totalShares = vault.totalShares.plus(event.params.sharesForReceiver)
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

  let positionId = `${vault.id}-${receiver.id}`
  let position = Position.load(positionId)
  if (position === null) {
    position = new Position(positionId)
    position.vault = vault.id
    position.account = receiver.id
  }

  position.balance = event.params.vaultBalance
  position.save()

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
    account.label = account.id
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
    sender.label = sender.id
    sender.save()
  }

  let receiver = Account.load(event.params.receiver.toHexString())
  if (receiver === null) {
    receiver = new Account(event.params.receiver.toHexString())
    receiver.label = receiver.id
    receiver.save()
  }

  let vault = Vault.load(event.params.vaultId.toString())
  if (vault === null) {
    vault = new Vault(event.params.vaultId.toString())
  }
  vault.totalShares = vault.totalShares.minus(event.params.shares)
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

  let positionId = `${vault.id}-${sender.id}`
  let position = Position.load(positionId)
  if (position === null) {
    position = new Position(positionId)
    position.vault = vault.id
    position.account = sender.id
  }

  position.balance = event.params.vaultBalance
  position.save()

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



