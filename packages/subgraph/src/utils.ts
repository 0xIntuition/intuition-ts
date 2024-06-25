import { BigInt } from '@graphprotocol/graph-ts'

import {
  Account,
  Vault,
} from '../generated/schema'
export function shortId(id: string): string {
  return id.substring(0, 6) + "..." + id.substring(id.length - 4)
}

export function loadOrCreateAccount(id: string): Account {
  let account = Account.load(id)
  if (account == null) {
    account = new Account(id)
    account.label = shortId(account.id)
    account.type = "Default"
  }
  return account
}

export function loadOrCreateVault(id: string): Vault {
  let vault = Vault.load(id)
  if (vault == null) {
    vault = new Vault(id)
    vault.totalShares = BigInt.fromI32(0)
  }
  return vault
}
