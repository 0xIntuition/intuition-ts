# Intuition CLI

The Intuition CLI is a powerful command-line interface that allows you to interact with the Intuition protocol directly from your terminal. With this tool, you can manage accounts, create and manage Intuition Atoms, and configure your settings with ease.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@0xintuition/cli.svg)](https://www.npmjs.com/package/@0xintuition/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@0xintuition/cli.svg)](https://npmjs.org/package/@0xintuition/cli)

## Installation

To get started, install the Intuition CLI globally using npm:

```sh-session
npm install -g @0xintuition/cli
```

## Usage

Once installed, you can use the `intu` command to access the CLI's features. To see a list of available commands, run:

```sh-session
intu --help
```

## Commands

The Intuition CLI provides a range of commands to help you manage your interactions with the protocol. Below is an overview of the main commands and their functions.

## Account Management

You can manage your Ethereum accounts using the `account` commands.

- **Generate a new account:**

  ```sh-session
  intu account generate [--name <NAME>] [--default]
  ```

  **Flags:**

  - `-n, --name <value>`: Name of the account to generate (optional)
  - `-d, --default`: Set as default account (optional)

- **Import an account from a private key:**

  ```sh-session
  intu account import <PRIVATE_KEY> [--name <NAME>] [--default]
  ```

  **Flags:**

  - `-n, --name <value>`: Name of the account to import (optional)
  - `-d, --default`: Set as default account (optional)

- **List your accounts:**

  ```sh-session
  intu account list [--export]
  ```

  **Flags:**

  - `-e, --export`: Show the private key for each account (optional)

- **Set your default account:**

  ```sh-session
  intu account default <ADDRESS>
  ```

  **Flags:**
  (No flags)

- **Check account balance:**

  ```sh-session
  intu account balance <ADDRESS?>
  ```

  **Flags:**
  (No flags)

- **Reset accounts:**
  ```sh-session
  intu account reset
  ```
  **Flags:**
  (No flags)

## Creating Atoms

Atoms are the core of the Intuition protocol. You can create them one by one or in batches.

- **Create a single Atom:**
  ```sh-session
  intu atom create [--network <NETWORK>] [--deposit <AMOUNT>]
  ```
  **Flags:**
  - `--network <value>`: Target network (base, base-sepolia) (optional)
  - `--deposit <value>`: Deposit amount in ETH (optional)

## Batch Atom Creation

For creating multiple Atoms at once, the batch functionality is recommended.

1. ### **Setup a batch file:**

   ```sh-session
   intu atom batch setup [--name <FILENAME>.csv]
   ```

   **Flags:**

   - `-n, --name <value>`: Name of file to create (default: intuition-data.csv)

   First, create a CSV file for your batch. The CLI provides a simple setup command to generate a template file.

   By default the new CSV filename is intuition-data.csv

   This will create a CSV file with the required headers. You can then open this file and add the data for the Atoms you want to create.

   **Example `atoms.csv`:**

   ```csv
   name,description,image,uris
   "My First Atom","This is a description of my first Atom.","","[{""uri"":"https://example.com""}]"
   "My Second Atom","This is a description of my second Atom.","","[{""uri"":"https://anotherexample.com""}]"
   ```

2. ### **Start the batch creation:**

   ```sh-session
   intu atom batch start [--name <FILENAME>.csv] [--count <NUMBER>] [--list <LIST_IDS>] [--network <NETWORK>]
   ```

   **Flags:**

   - `-n, --name <value>`: Filename to load (default: intuition-data.csv)
   - `-c, --count <value>`: Amount to batch together (default: 50)
   - `-l, --list <value>`: Add atoms to a list (comma-separated for multiple)
   - `--network <value>`: Network to use (optional)

   Once your CSV file is ready, you can start the batch creation process.

   New atoms can automatically be added to a list using the `list` flag.
   Atoms can be added to multiple lists using comma separated values.

   The CLI will then read the CSV file and create the Atoms on the blockchain.

### Configuration

You can manage the CLI's configuration using the `config` commands.

- **Set the default network:**

  ```sh-session
  intu config default-network <NETWORK>
  ```

  **Flags:**
  (No flags)

- **Show the current default network:**
  ```sh-session
  intu config default-network
  ```
  **Flags:**
  (No flags)

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/0xintuition/intuition-ts) for more information on how to contribute.

## License

This project is licensed under the MIT License.
