// Types for batch atom creation and CSV processing

export interface Account {
  [key: string]: unknown
  address: string
  privateKey: string
}

export interface ThingCsvRow {
  [key: string]: unknown
  description: string
  image: string
  ipfsUri?: string
  name: string
  url: string
  vaultId?: string
}

export interface BatchInputThing {
  description: string
  image: string
  name: string
  url: string
}

// Add more types as needed for other atom types (e.g., EthereumAccountCsvRow, BatchInputEthereumAccount)
