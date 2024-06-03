import { privateKeyToAccount } from 'viem/accounts'

export const MNEMONIC =
  'legal winner thank year wave sausage worth useful legal winner thank yellow'

export const CONTRACT_ADDRESS = '0x04056c43d0498b22f7a0c60d4c3584fb5fa881cc'

/** 
 * https://raw.githubusercontent.com/streamingfast/firehose-ethereum/develop/devel/standard/miner/keystore.md
- Address `821b55d8abe79bc98f05eb675fdc50dfe796b7ab` => Private key `52e1cc4b9c8b4fc9b202adf06462bdcc248e170c9abd56b2adb84c8d87bee674`
- Address `832de76536377dd681de5d26e2d5f6117db11392` => Private key `4c10a0003ad9d62b50d741dd7f4f062846490a245db1151e930b6514f1d10157`
- Address `ac09ba0311b92aaefbf01e5b8aef1e00adb7ad02` => Private key `7dbeaa29a12493a2c9156549b75ac09d8d47cd5d72e8d278661f0e532138a77d`
- Address `3d1d003e8799638165c70ff515379b926ca2d123` => Private key `89f3f7ed21e2b111487bd43424cb689f2519c8b09db48378fee9820df166d942`
- Address `403a09cd493e41d381ebff4ffb01de4c9f2ff1dc` => Private key `2f6e6a9af650c60e4b2c6a0a1b440cec202182bed3fc15bc5b8eec1132b2d6ad`
- Address `92f2187845b98c65e20f51ceb223ffe1c9c1ead2` => Private key `9db4f980e97644e99242c251f91c1e773d5649fc48f5bf095cd4378ebc765694`
- Address `dfe15828305e9968835e7797f063bd8bbec038c0` => Private key `cb3c1ca36610c116e9aa478102faeaf100cc79c462f0d25a631110e36a2868c8`
- Address `ccd3dd1db00b7c5b493b879f04379287227d200d` => Private key `b1c73d7b1103387b725df649a70d8c2c3cca61a60781f19d0a91ced1ea1be35b`
- Address `e8c4b557fb717f7a366d4cb7f8fe41ef1e108c16` => Private key `72194c8757fde016fa20cbc1ec09b8e64413c4ad7aba23bdb12664311e03f419`
- Address `634c337deb8125ccef2378e811fa3980047ddad0` => Private key `952e84cc30043d8bf52c36349b5f8e7e37c4c0093eb476fcf26244c252b9dd6b`
    */
export const ADMIN = privateKeyToAccount(
  '0x3c0afbd619ed4a8a11cfbd8c5794e08dc324b6809144a90c58bc0ff24219103b',
)
