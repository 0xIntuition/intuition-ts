const fs = require('fs')

const obj = require('./EthMultiVault.json')

const abi = obj.abi
const bytecode = obj.bytecode.object

console.log('Generating abi.ts')
fs.writeFileSync(
  './src/abi.ts',
  `export const abi = ${JSON.stringify(abi)} as const;`,
)

console.log('Generating bytecode.ts')
fs.writeFileSync(
  './tests/bytecode.ts',
  `export const bytecode = '${bytecode}';`,
)

console.log('Done')
