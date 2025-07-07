Intuition CLI
=================

A CLI for the Intuition protocol.


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/intuition-cli.svg)](https://npmjs.org/package/intuition-cli)
[![Downloads/week](https://img.shields.io/npm/dw/intuition-cli.svg)](https://npmjs.org/package/intuition-cli)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g intuition-cli
$ intu COMMAND
running command...
$ intu (--version)
intuition-cli/0.0.0 darwin-arm64 node-v22.12.0
$ intu --help [COMMAND]
USAGE
  $ intu COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->

## Account Commands

### `intu account generate`
Generate a new account.

**Flags:**
- `-n, --name <value>`: Name of the account to generate (optional)
- `-d, --default`: Set as default account (optional)

**Example:**
```
$ intu account generate --name mywallet --default
```

### `intu account import PRIVATE_KEY`
Import an account using a private key.

**Arguments:**
- `PRIVATE_KEY`: Private key to import (required)

**Flags:**
- `-n, --name <value>`: Name of the account to import (optional)
- `-d, --default`: Set as default account (optional)

**Example:**
```
$ intu account import 0xabc123... --name mywallet --default
```

### `intu account list`
List active accounts.

**Example:**
```
$ intu account list
```

### `intu account set-default ADDRESS`
Set the default account by address.

**Arguments:**
- `ADDRESS`: Address of the account to set as default (required)

**Example:**
```
$ intu account set-default 0x1234...abcd
```

### `intu account balance [ADDRESS]`
Show the balance of an account on Base and Base Sepolia.

**Arguments:**
- `ADDRESS`: Address to check balance for (optional; uses default account if omitted)

**Example:**
```
$ intu account balance
$ intu account balance 0x1234...abcd
```

### `intu account reset`
Remove all existing accounts after confirmation.

**Example:**
```
$ intu account reset
```

---

## Atom Commands

### `intu atom create`
Create a new atom on the blockchain.

**Flags:**
- `--network <value>`: Target network (base, base-sepolia)
- `--deposit <value>`: Deposit amount in ETH (optional)

**Interactive:** Prompts for atom type (Ethereum Account or IPFS URI) and relevant data.

**Example:**
```
$ intu atom create --network base --deposit 0.01
```

### `intu atom batch setup`
Create a new CSV file to handle batch uploads.

**Flags:**
- `-n, --name <value>`: Name of file to create (default: intuition-data.csv)

**Interactive:** Prompts for template type (Ethereum Accounts, IPFS URI, Things).

**Example:**
```
$ intu atom batch setup --name my-batch.csv
```

**Sample templates:**
- `ethereum-accounts.csv`:
  ```csv
  address,vaultId
  0x0000000000000000000000000000000000000000,
  ```
- `things.csv`:
  ```csv
  name,description,image,url,vaultId,ipfsUri
  "Example Name","Example description of thing.",https://example.com/logo.png,https://example.com/,,
  ```
- `ipfs-uri.csv`:
  ```csv
  ipfsUri,txHash
  ipfs://,
  ```

### `intu atom batch start`
Batch create atoms using a CSV file.

**Flags:**
- `-n, --name <value>`: Filename to load (default: intuition-data.csv)
- `-c, --count <value>`: Amount to batch together (default: 50)
- `-l, --list <value>`: Add atoms to a list (optional)

**Interactive:** Prompts for atom type (Thing, Ethereum Account).

**Example:**
```
$ intu atom batch start --name my-batch.csv --count 100 --list my-list
```

---

## Config Commands

### `intu config default-network [NETWORK]`
Set or show the default network (base or base-sepolia). Default is base.

**Arguments:**
- `NETWORK`: Network to set as default (base or base-sepolia)

**Example:**
```
$ intu config default-network base
$ intu config default-network base-sepolia
$ intu config default-network
```

