import { type Address } from "viem";
import { beforeAll, expect } from "vitest";
import { describe, it } from 'vitest'
import { Intuition } from "./core.js";
import { deployAndInit } from "../tests/deploy.js";
import { publicClient, walletClient } from "../tests/utils.js";

let address: Address;
let intuition: Intuition;

beforeAll(async () => {
  address = await deployAndInit();
  intuition = new Intuition({
    public: publicClient,
    wallet: walletClient
  }, address);
});

describe('Intuition', () => {

  it("can get atom cost", async () => {
    const cost = await intuition.getAtomCost();
    expect(cost).toBeDefined();
  });

  it("can create atom", async () => {
    const vaultId = await intuition.createAtom('hello');
    expect(vaultId).toBeDefined();
  });

  it("can get triple cost", async () => {
    const cost = await intuition.getTripleCost();
    expect(cost).toBeDefined();
  });

  it("can create triple", async () => {
    const id1 = await intuition.createAtom('Alice')
    const id2 = await intuition.createAtom('likes')
    const id3 = await intuition.createAtom('https://intuition.systems')

    const result = await intuition.createTriple(id1, id2, id3)
    expect(result).toBeDefined();
  });
});
