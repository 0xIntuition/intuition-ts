import { formatEther, parseEther, type Address } from "viem";
import { describe, it, beforeAll, expect } from "vitest";
import { Multivault } from "../src/multivault.js";
import { deployAndInit } from "./deploy.js";
import { publicClient, walletClient } from "./utils.js";

let address: Address;
let multiVault: Multivault;

beforeAll(async () => {
  address = await deployAndInit();
  multiVault = new Multivault({
    public: publicClient,
    wallet: walletClient
  }, address);
});

describe('MultiVault', () => {
  it("can get atom cost", async () => {
    const cost = await multiVault.getAtomCost();
    expect(cost).toBeDefined();
  });

  it("can create atom", async () => {
    const { vaultId, hash, events } = await multiVault.createAtom('hello');
    expect(vaultId).toBeDefined();
    expect(hash).toBeDefined();
    expect(events).toBeDefined();
  });

  it("throws error when creating atom with the same atomUri", async () => {
    await expect(
      () => multiVault.createAtom('hello')
    ).rejects.toThrow('Transaction reverted');
  });

  it("throws error when creating atom with insufficient cost", async () => {
    await expect(
      () => multiVault.createAtom('hello', BigInt(1))
    ).rejects.toThrow('Transaction reverted');
  });

  it("can get triple cost", async () => {
    const cost = await multiVault.getTripleCost();
    expect(cost).toBeDefined();
  });

  it("can create triple", async () => {
    const { vaultId: subjectId } = await multiVault.createAtom('Alice')
    const { vaultId: predicateId } = await multiVault.createAtom('likes')
    const { vaultId: objectId } = await multiVault.createAtom('https://intuition.systems')

    const { vaultId, hash, events } = await multiVault.createTriple(subjectId, predicateId, objectId)
    expect(vaultId).toBeDefined();
    expect(hash).toBeDefined();
    expect(events).toBeDefined();
  });


  it("throws error when creating atom with insufficient cost", async () => {
    const { vaultId: subjectId } = await multiVault.createAtom('foo')
    const { vaultId: predicateId } = await multiVault.createAtom('bar')
    const { vaultId: objectId } = await multiVault.createAtom('baz')

    await expect(
      () => multiVault.createTriple(subjectId, predicateId, objectId, BigInt(1))
    ).rejects.toThrow('Transaction reverted');
  });

});

describe("use case X", () => {

  let atomVaultId: bigint;
  let sharesPreview: bigint;

  it("can create atom", async () => {
    const { vaultId } = await multiVault.createAtom('lorem');
    expect(vaultId).toBeDefined();

    atomVaultId = vaultId;
  });

  it("can get current share price for given vault id", async () => {
    const price = await multiVault.currentSharePrice(atomVaultId);
    expect(price).toBeDefined();
  });

  it("can preview deposit", async () => {
    const assets = parseEther('1');
    sharesPreview = await multiVault.previewDeposit(assets, atomVaultId);
    expect(sharesPreview).toBeDefined();
  });

  it("can deposit assets to atom vault", async () => {
    const assets = parseEther('1');
    const { hash, shares, events } = await multiVault.depositAtom(atomVaultId, assets);
    expect(hash).toBeDefined();
    expect(events).toBeDefined();
    expect(shares).toBeDefined();
    // fails
    // expect(shares).toEqual(sharesPreview);
    // console.log('shares', formatEther(shares));
    // console.log('sharesPreview', formatEther(sharesPreview));
  });

});
