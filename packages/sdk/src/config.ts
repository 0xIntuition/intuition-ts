import { configureClient, type ClientConfigInput } from '@0xintuition/graphql'

export type SdkConfig = {
  apiUrl?: string
  pinApiUrl?: string
  pinApiKey?: string
  pinataApiJWT?: string
}

let sdkConfig: SdkConfig = {}

export function configureSdk(config: SdkConfig): void {
  sdkConfig = { ...sdkConfig, ...config }

  const graphConfig: ClientConfigInput = {}
  if ('apiUrl' in config) {
    graphConfig.apiUrl = config.apiUrl
  }
  if ('pinApiUrl' in config) {
    graphConfig.pinApiUrl = config.pinApiUrl
  }
  if ('pinApiKey' in config) {
    graphConfig.pinApiKey = config.pinApiKey
  }

  configureClient(graphConfig)
}

export function getSdkConfig(): SdkConfig {
  return { ...sdkConfig }
}
