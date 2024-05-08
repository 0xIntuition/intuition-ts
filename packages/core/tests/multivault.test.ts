import { type Address } from "viem";
import { describe, it, beforeAll, expect } from "vitest";
import { Multivault } from "../src/multivault.js";
import { deployAndInit } from "./deploy.js";
import { publicClient, walletClient } from "./utils.js";

let address: Address;
let multivault: Multivault;

beforeAll(async () => {
  address = await deployAndInit();
  multivault = new Multivault({
    public: publicClient,
    wallet: walletClient
  }, address);
});

describe('Multivault', () => {
  it("can get atom cost", async () => {
    const cost = await multivault.getAtomCost();
    expect(cost).toBeDefined();
  });

  it("can create atom", async () => {
    const { vaultId, events } = await multivault.createAtom('hello');
    expect(vaultId).toBeDefined();
    expect(events).toBeDefined();
  });

  it("throws error when creating atom with insufficient cost", async () => {
    await expect(
      () => multivault.createAtom('hello', BigInt(1))
    ).rejects.toThrow('Transaction reverted');
  });

  it("can get triple cost", async () => {
    const cost = await multivault.getTripleCost();
    expect(cost).toBeDefined();
  });

  it("can create triple", async () => {
    const { vaultId: subjectId } = await multivault.createAtom('Alice')
    const { vaultId: predicateId } = await multivault.createAtom('likes')
    const { vaultId: objectId } = await multivault.createAtom('https://intuition.systems')

    const { vaultId, events } = await multivault.createTriple(subjectId, predicateId, objectId)
    expect(vaultId).toBeDefined();
    expect(events).toBeDefined();
  });


  it("throws error when creating atom with insufficient cost", async () => {
    const { vaultId: subjectId } = await multivault.createAtom('foo')
    const { vaultId: predicateId } = await multivault.createAtom('bar')
    const { vaultId: objectId } = await multivault.createAtom('baz')

    await expect(
      () => multivault.createTriple(subjectId, predicateId, objectId, BigInt(1))
    ).rejects.toThrow('Transaction reverted');
  });
});
