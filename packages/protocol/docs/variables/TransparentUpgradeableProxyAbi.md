[**@0xintuition/protocol**](../README.md)

---

[@0xintuition/protocol](../README.md) / TransparentUpgradeableProxyAbi

# Variable: TransparentUpgradeableProxyAbi

> `const` **TransparentUpgradeableProxyAbi**: readonly \[\{ `inputs`: readonly \[\{ `internalType`: `"address"`; `name`: `"_logic"`; `type`: `"address"`; \}, \{ `internalType`: `"address"`; `name`: `"initialOwner"`; `type`: `"address"`; \}, \{ `internalType`: `"bytes"`; `name`: `"_data"`; `type`: `"bytes"`; \}\]; `stateMutability`: `"payable"`; `type`: `"constructor"`; \}, \{ `stateMutability`: `"payable"`; `type`: `"fallback"`; \}, \{ `anonymous`: `false`; `inputs`: readonly \[\{ `indexed`: `false`; `internalType`: `"address"`; `name`: `"previousAdmin"`; `type`: `"address"`; \}, \{ `indexed`: `false`; `internalType`: `"address"`; `name`: `"newAdmin"`; `type`: `"address"`; \}\]; `name`: `"AdminChanged"`; `type`: `"event"`; \}, \{ `anonymous`: `false`; `inputs`: readonly \[\{ `indexed`: `true`; `internalType`: `"address"`; `name`: `"implementation"`; `type`: `"address"`; \}\]; `name`: `"Upgraded"`; `type`: `"event"`; \}, \{ `inputs`: readonly \[\{ `internalType`: `"address"`; `name`: `"target"`; `type`: `"address"`; \}\]; `name`: `"AddressEmptyCode"`; `type`: `"error"`; \}, \{ `inputs`: readonly \[\{ `internalType`: `"address"`; `name`: `"admin"`; `type`: `"address"`; \}\]; `name`: `"ERC1967InvalidAdmin"`; `type`: `"error"`; \}, \{ `inputs`: readonly \[\{ `internalType`: `"address"`; `name`: `"implementation"`; `type`: `"address"`; \}\]; `name`: `"ERC1967InvalidImplementation"`; `type`: `"error"`; \}, \{ `inputs`: readonly \[\]; `name`: `"ERC1967NonPayable"`; `type`: `"error"`; \}, \{ `inputs`: readonly \[\]; `name`: `"FailedCall"`; `type`: `"error"`; \}, \{ `inputs`: readonly \[\]; `name`: `"ProxyDeniedAdminAccess"`; `type`: `"error"`; \}\]

Defined in: [packages/protocol/src/contracts/TransparentUpgradeableProxy-abi.ts:1](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/protocol/src/contracts/TransparentUpgradeableProxy-abi.ts#L1)
