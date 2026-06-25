import { configureClient, type ClientConfigInput } from '@0xintuition/graphql'

export { PIN_API_URL } from '@0xintuition/graphql'

export type SdkConfig = ClientConfigInput

export function configureSdk(config: SdkConfig): void {
  configureClient(config)
}
