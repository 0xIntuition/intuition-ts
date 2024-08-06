import { BigInt, Bytes, log } from '@graphprotocol/graph-ts'

import { Account, Vault } from '../generated/schema'

export function shortId(id: string): string {
  return id.substring(0, 6) + '...' + id.substring(id.length - 4)
}

export function loadOrCreateAccount(id: Bytes): Account {
  let account = Account.load(id.toHexString())
  if (account == null) {
    account = new Account(id.toHexString())
    account.label = shortId(id.toHexString())
    account.type = 0
    account.save()
  }
  return account
}

export function loadOrCreateVault(id: string): Vault {
  let vault = Vault.load(id)
  if (vault == null) {
    vault = new Vault(id)
    vault.total_shares = BigInt.fromI32(0)
  }
  return vault
}

export function getCounterVaultId(vaultId: BigInt): BigInt {
  return BigInt.fromI32(2)
    //@ts-ignore
    .pow(255 as u8)
    .times(BigInt.fromI32(2))
    .minus(BigInt.fromI32(1))
    .minus(vaultId)
}

export function getAbsoluteTripleId(vaultId: BigInt): BigInt {
  const isCounterVault = BigInt.fromI32(2)
    //@ts-ignore
    .pow(255 as u8)
    .times(BigInt.fromI32(2))
    .minus(BigInt.fromI32(1))
    .div(BigInt.fromI32(2))
    .ge(vaultId)

  if (isCounterVault) {
    return BigInt.fromI32(2)
      //@ts-ignore
      .pow(255 as u8)
      .times(BigInt.fromI32(2))
      .minus(BigInt.fromI32(1))
      .minus(vaultId)
  }

  return vaultId
}
