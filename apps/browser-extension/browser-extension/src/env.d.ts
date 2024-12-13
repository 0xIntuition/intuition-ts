/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_RATE_LIMIT_RPM: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
