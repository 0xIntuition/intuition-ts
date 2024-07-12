import { BigInt, log } from '@graphprotocol/graph-ts'

import {
  AtomCreated,
  Deposited,
  FeesTransferred,
  Redeemed,
  TripleCreated,
} from '../generated/EthMultiVault/EthMultiVault'
import {
  Atom,
  AtomSignalData,
  AtomValue,
  Deposit,
  Event,
  FeeTransfer,
  Position,
  Redemption,
  Signal,
  Triple,
} from '../generated/schema'
import { parseAtomData } from './schema.org/parser'
import { loadOrCreateAccount, loadOrCreateVault } from './utils'

export function handleAtomCreated(event: AtomCreated): void {
  let atom = new Atom(event.params.vaultID.toString())

  let account = loadOrCreateAccount(event.params.creator.toHexString())

  let wallet = loadOrCreateAccount(event.params.atomWallet.toHexString())
  wallet.type = 'AtomWallet'
  wallet.atom_id = atom.id
  wallet.save()

  let vault = loadOrCreateVault(event.params.vaultID.toString())
  vault.atom_id = atom.id
  vault.save()
  atom.vault_id = vault.id

  atom.creator_id = account.id
  atom.wallet_id = wallet.id
  atom.uri = event.params.atomData.toString()

  parseAtomData(atom)

  if (atom.uri.toLowerCase() == account.id.toLowerCase()) {
    atom.type = 'Account'
    atom.emoji = '⛓️'
    atom.label = account.id.toString()
    let atomValue = new AtomValue(atom.id)
    atomValue.account_id = account.id
    atomValue.save()
    atom.value_id = atomValue.id
    account.atom_id = atom.id
  }
  account.save()

  atom.block_number = event.block.number
  atom.block_timestamp = event.block.timestamp
  atom.transaction_hash = event.transaction.hash

  atom.save()

  let ev = new Event(event.transaction.hash.concatI32(event.logIndex.toI32()))
  ev.type = 'AtomCreated'
  ev.atom_id = atom.id
  ev.block_number = event.block.number
  ev.block_timestamp = event.block.timestamp
  ev.transaction_hash = event.transaction.hash
  ev.save()
}

export function handleTripleCreated(event: TripleCreated): void {
  let triple = new Triple(event.params.vaultID.toString())

  let account = loadOrCreateAccount(event.params.creator.toHexString())

  let vault = loadOrCreateVault(event.params.vaultID.toString())
  vault.triple_id = triple.id
  vault.save()
  triple.vault_id = vault.id

  //@ts-ignore
  let invarseVaultId = BigInt.fromI32(2)
    .pow(255 as u8)
    .times(BigInt.fromI32(2))
    .minus(BigInt.fromI32(1))
    .minus(event.params.vaultID)
    .toString()

  let counter_vault = loadOrCreateVault(invarseVaultId)
  counter_vault.triple_id = triple.id
  counter_vault.total_shares = BigInt.fromI32(0)
  counter_vault.save()
  triple.counter_vault_id = counter_vault.id

  triple.positions_count = 0
  triple.inverse_positions_count = 0
  triple.active_positions_count = 0
  triple.all_positions_count = 0
  triple.tvl = vault.total_shares.plus(counter_vault.total_shares)
  triple.total_signal = triple.tvl
  triple.signals = []
  triple.positions = []
  triple.inverse_positions = []

  triple.creator_id = account.id
  triple.subject_id = event.params.subjectId.toString()
  triple.predicate_id = event.params.predicateId.toString()
  triple.object_id = event.params.objectId.toString()

  let subject = Atom.load(event.params.subjectId.toString())
  let predicate = Atom.load(event.params.predicateId.toString())
  let object = Atom.load(event.params.objectId.toString())

  // TODO: abstract this to a function
  if (subject !== null && predicate !== null && object !== null) {
    if (
      subject.type == 'Account' &&
      predicate.type == 'PersonPredicate' &&
      object.type == 'Person'
    ) {
      if (subject.uri.toLowerCase() == account.id.toLowerCase()) {
        account.label = object.label
        account.image = object.image
      }
    }
    if (
      subject.type == 'Account' &&
      predicate.type == 'OrganizationPredicate' &&
      object.type == 'Organization'
    ) {
      if (subject.uri.toLowerCase() == account.id.toLowerCase()) {
        account.label = object.label
        account.image = object.image
      }
    }
  }
  account.save()

  triple.block_number = event.block.number
  triple.block_timestamp = event.block.timestamp
  triple.transaction_hash = event.transaction.hash

  triple.save()

  let ev = new Event(event.transaction.hash.concatI32(event.logIndex.toI32()))
  ev.type = 'TripleCreated'
  ev.triple_id = triple.id
  ev.block_number = event.block.number
  ev.block_timestamp = event.block.timestamp
  ev.transaction_hash = event.transaction.hash
  ev.save()
}

export function handleDeposited(event: Deposited): void {
  let deposit = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  let sender = loadOrCreateAccount(event.params.sender.toHexString())
  sender.save()

  let receiver = loadOrCreateAccount(event.params.receiver.toHexString())
  receiver.save()

  let vault = loadOrCreateVault(event.params.vaultId.toString())
  vault.total_shares = vault.total_shares.plus(event.params.sharesForReceiver)
  vault.save()

  deposit.vault_id = vault.id
  deposit.sender_id = sender.id
  deposit.receiver_id = receiver.id

  deposit.receiver_total_shares_in_vault =
    event.params.receiverTotalSharesInVault
  deposit.sender_assets_after_total_fees =
    event.params.senderAssetsAfterTotalFees
  deposit.shares_for_receiver = event.params.sharesForReceiver
  deposit.entry_fee = event.params.entryFee

  deposit.is_triple = event.params.isTriple
  deposit.is_atom_wallet = event.params.isAtomWallet

  deposit.block_number = event.block.number
  deposit.block_timestamp = event.block.timestamp
  deposit.transaction_hash = event.transaction.hash

  deposit.save()

  let positionId = `${vault.id}-${receiver.id}`
  let position = Position.load(positionId)
  if (position === null) {
    position = new Position(positionId)
    position.vault_id = vault.id
    position.account_id = receiver.id
  }

  position.shares = event.params.receiverTotalSharesInVault
  position.save()

  if (deposit.is_atom_wallet == false) {
    let signal = new Signal(
      event.transaction.hash.concatI32(event.logIndex.toI32()),
    )
    let totalShares = vault.total_shares
    let relativeStrength = totalShares.gt(BigInt.fromI32(0))
      ? event.params.sharesForReceiver
          .times(BigInt.fromI32(100))
          .div(totalShares)
      : BigInt.fromI32(100)

    signal.delta = event.params.sharesForReceiver
    signal.relative_strength = relativeStrength
    signal.account_id = sender.id
    signal.atom_id = deposit.is_triple ? null : vault.id
    signal.triple_id = deposit.is_triple ? vault.id : null
    signal.deposit_id = deposit.id
    signal.redemption_id = null
    signal.block_number = event.block.number
    signal.block_timestamp = event.block.timestamp
    signal.transaction_hash = event.transaction.hash
    signal.save()

    if (deposit.is_triple == false) {
      let atomSignalData = new AtomSignalData('auto')
      atomSignalData.atom_id = vault.id
      atomSignalData.account_id = sender.id
      atomSignalData.delta = signal.delta
      atomSignalData.save()
    }
  }

  let ev = new Event(event.transaction.hash.concatI32(event.logIndex.toI32()))
  ev.type = 'Deposited'
  ev.deposit_id = deposit.id
  ev.block_number = event.block.number
  ev.block_timestamp = event.block.timestamp
  ev.transaction_hash = event.transaction.hash
  ev.save()
}

export function handleFeesTransferred(event: FeesTransferred): void {
  let feeTransfer = new FeeTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )

  let account = loadOrCreateAccount(event.params.sender.toHexString())
  account.save()

  let receiver = loadOrCreateAccount(event.params.protocolVault.toHexString())
  receiver.label = 'Protocol fee vault'
  receiver.type = 'ProtocolVault'
  receiver.save()

  feeTransfer.sender_id = account.id
  feeTransfer.receiver_id = receiver.id
  feeTransfer.amount = event.params.amount

  feeTransfer.block_number = event.block.number
  feeTransfer.block_timestamp = event.block.timestamp
  feeTransfer.transaction_hash = event.transaction.hash

  feeTransfer.save()

  let ev = new Event(event.transaction.hash.concatI32(event.logIndex.toI32()))
  ev.type = 'FeesTransfered'
  ev.fee_transfer_id = feeTransfer.id
  ev.block_number = event.block.number
  ev.block_timestamp = event.block.timestamp
  ev.transaction_hash = event.transaction.hash
  ev.save()
}

export function handleRedeemed(event: Redeemed): void {
  let redemption = new Redemption(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  let sender = loadOrCreateAccount(event.params.sender.toHexString())
  sender.save()

  let receiver = loadOrCreateAccount(event.params.receiver.toHexString())
  receiver.save()

  let vault = loadOrCreateVault(event.params.vaultId.toString())
  let totalShares = vault.total_shares
  vault.total_shares = vault.total_shares.minus(
    event.params.sharesRedeemedBySender,
  )
  vault.save()

  redemption.sender_id = sender.id
  redemption.receiver_id = receiver.id

  redemption.shares_redeemed_by_sender = event.params.sharesRedeemedBySender
  redemption.assets_for_receiver = event.params.assetsForReceiver
  redemption.sender_total_shares_in_vault =
    event.params.senderTotalSharesInVault
  redemption.exit_fee = event.params.exitFee
  redemption.vault_id = vault.id

  redemption.block_number = event.block.number
  redemption.block_timestamp = event.block.timestamp
  redemption.transaction_hash = event.transaction.hash

  redemption.save()

  let positionId = `${vault.id}-${sender.id}`
  let position = Position.load(positionId)
  if (position === null) {
    position = new Position(positionId)
    position.vault_id = vault.id
    position.account_id = sender.id
  }

  position.shares = event.params.senderTotalSharesInVault
  position.save()

  let signal = new Signal(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )

  let relativeStrength = totalShares.equals(BigInt.zero())
    ? BigInt.fromI32(100)
    : event.params.sharesRedeemedBySender
        .times(BigInt.fromI32(100))
        .div(totalShares)

  signal.delta = event.params.sharesRedeemedBySender.times(BigInt.fromI32(-1))
  signal.relative_strength = relativeStrength
  signal.account_id = sender.id
  signal.atom_id = null
  signal.triple_id = null
  signal.deposit_id = null
  signal.redemption_id = redemption.id
  signal.block_number = event.block.number
  signal.block_timestamp = event.block.timestamp
  signal.transaction_hash = event.transaction.hash
  signal.save()

  let ev = new Event(event.transaction.hash.concatI32(event.logIndex.toI32()))
  ev.type = 'Redeemed'
  ev.redemption_id = redemption.id
  ev.block_number = event.block.number
  ev.block_timestamp = event.block.timestamp
  ev.transaction_hash = event.transaction.hash
  ev.save()
}
