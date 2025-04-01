/// <reference types="@remix-run/node" />

interface ImportMetaEnv {
  readonly ANVIL_RPC_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 