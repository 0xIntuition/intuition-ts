import { ALICE, BOB } from "../tests/constants.js";
import { publicClient, walletClient } from "../tests/utils.js";
import { type Address, isAddress } from "viem";
import { beforeAll, expect, test } from "vitest";
import { abi } from "./abi";
import { bytecode } from "./bytecode";
import { describe, it } from 'vitest'
import { getContract, parseEther, parseEventLogs, parseUnits, toHex } from 'viem';
import { Intuition } from "./core.js";
let address: Address;
beforeAll(async () => {
  const hash = await walletClient.deployContract({
    abi,
    bytecode: bytecode.object,
    account: ALICE,
  });

  const receipt = await publicClient.waitForTransactionReceipt({
    hash,
  });

  // rome-ignore lint/style/noNonNullAssertion: this is guaranteed to be set.
  address = receipt.contractAddress!;
  const hash2 = await walletClient.writeContract({
    address,
    account: ALICE,
    abi,
    functionName: 'init',
    args: [
      {
        admin: ALICE,
        protocolVault: ALICE,
        feeDenominator: parseEther('10000'), // Common denominator for fee
        minDeposit: parseEther('0.0003'), // Minimum deposit amount in wei
        minShare: 10000n, // Minimum share amount (e.g., for vault initialization)
        atomUriMaxLength: parseUnits('250', 3), // Maximum length of the atom URI data that can be passed when creating atom vaults
        decimalPrecision: parseUnits('1', 18), // decimal precision used for calculating share prices
        minDelay: BigInt(2 * 24 * 60 * 60 * 1000), // minimum delay for timelocked transactions
      },
      {
        atomWalletInitialDepositAmount: parseEther('0.0001'), // Fee charged for purchasing vault shares for the atom wallet upon creation
        atomCreationProtocolFee: parseEther('0.0002') // Fee charged for creating an atom
      },
      {
        tripleCreationProtocolFee: parseEther('0.0002'), // Fee for creating a triple
        atomDepositFractionOnTripleCreation: parseEther('0.0003'), // Static fee going towards increasing the amount of assets in the underlying atom vaults
        atomDepositFractionForTriple: 1500n // Fee for equity in atoms when creating a triple
      },
      {
        permit2: ALICE, // Permit2 on Base
        entryPoint: ALICE, // EntryPoint address on Base
        atomWarden: ALICE, // AtomWarden address (should be a multisig in production)
        atomWalletBeacon: ALICE // Address of the AtomWalletBeacon contract
      },
      {
        entryFee: 500n, // Entry fee for vault 0
        exitFee: 500n, // Exit fee for vault 0
        protocolFee: 100n // Protocol fee for vault 0
      }
    ]
  });

  expect(hash2).toBeDefined();
  const receipt2 = await publicClient.waitForTransactionReceipt({
    hash: hash2,
  });
  expect(receipt2).toBeDefined();

});
describe('Intuition', () => {

  it("can deploy the multivault contract", async () => {
    expect(address).toBeDefined();
    expect(isAddress(address)).toBe(true);
  });


  it("can create atom", async () => {
    const intuition = new Intuition({ public: publicClient, wallet: walletClient }, address);
    const vaultId = await intuition.createAtom('hello');
    expect(vaultId).toBeDefined();
  });

});
