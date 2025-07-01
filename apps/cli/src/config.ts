import Conf from 'conf';

export type Account = {
  name: string;
  privateKey: string;
  address: string;
};

export type IntuitionConfig = {
  accounts: Account[];
  defaultAccount?: string;
  defaultNetwork?: string;
};

const config = new Conf<IntuitionConfig>({
  defaults: {
    accounts: [],
  },
  projectName: 'intuition-cli',
});

export function getAccounts(): Account[] {
  return config.get('accounts') || [];
}

export function addAccount(account: Account): void {
  const accounts = getAccounts();
  accounts.push(account);
  config.set('accounts', accounts);
}

export function getDefaultNetwork(): string | undefined {
  return config.get('defaultNetwork');
}

export function setDefaultNetwork(network: string): void {
  config.set('defaultNetwork', network);
}

export function getDefaultAccount(): string | undefined {
  return config.get('defaultAccount');
}

export function setDefaultAccount(address: string): void {
  config.set('defaultAccount', address);
}

export function clearAccounts(): void {
  config.set('accounts', [])
  config.delete('defaultAccount')
} 