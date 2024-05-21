import { create } from 'kubo-rpc-client'

export const ipfs = create(new URL('http://127.0.0.1:5001'))
