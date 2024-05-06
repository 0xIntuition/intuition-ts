import { pool } from "./utils.js";
import { fetchLogs } from "@viem/anvil";
import { afterEach } from "vitest";

afterEach(async (context) => {
  context.onTestFailed(async () => {
    // If a test fails, you can fetch and print the logs of your anvil instance.
    const logs = await fetchLogs("http://localhost:8545", pool);
    // Only print the 20 most recent log messages.
    console.log(...logs.slice(-20));
  });
});
