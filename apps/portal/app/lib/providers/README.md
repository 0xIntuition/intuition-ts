# Provider Architecture

## Overview

The Portal application uses a carefully structured provider hierarchy to manage authentication, state, and data fetching. This document outlines the provider structure, dependencies, and best practices.

## Provider Structure

```tsx
<PrivyConfig>
  {' '}
  // Web3 authentication
  <QueryClientProvider>
    {' '}
    // Global data fetching
    <WagmiProvider>
      {' '}
      // Ethereum interactions
      <AuthProvider>
        {' '}
        // Custom auth state
        <HydrationBoundary>
          {' '}
          // Server state hydration
          {children}
        </HydrationBoundary>
      </AuthProvider>
    </WagmiProvider>
  </QueryClientProvider>
</PrivyConfig>
```

## Provider Responsibilities

### 1. PrivyConfig (`privy.tsx`)

- Handles web3 authentication and wallet connections
- Configures supported chains and login methods
- Manages wallet state and user identity
- Configuration:
  ```tsx
  const privyConfig = {
    loginMethods: ['wallet'],
    appearance: { theme: 'dark', showWalletLoginFirst: true },
    defaultChain: base,
    supportedChains: [mainnet, base, baseSepolia],
  }
  ```

### 2. QueryClientProvider

- Manages global data fetching state
- Handles caching and revalidation
- Configuration:
  ```tsx
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })
  ```

### 3. WagmiProvider

- Provides Ethereum interaction capabilities
- Manages wallet connections and chain switching
- Must be nested inside PrivyConfig
- Configuration set via wagmiConfig in utils/wagmi

### 4. AuthProvider (`auth-provider.tsx`)

- Custom authentication state management
- Handles login/logout flows
- Manages session persistence
- Provides auth context to the application

### 5. HydrationBoundary

- Manages server state hydration
- Ensures consistent state between server and client
- Handles dehydrated query state

## Usage Guidelines

1. Provider Order

   - Never change the nesting order of providers
   - PrivyConfig must always be the outermost web3-related provider
   - WagmiProvider must be nested inside PrivyConfig

2. Client-Side Only

   - Providers are wrapped in `ClientOnly` to prevent SSR issues
   - Web3 functionality is only available on the client

3. Environment Variables

   - PRIVY_APP_ID must be provided via env prop
   - Chain configuration based on environment

4. Error Handling
   - Sentry integration for error tracking
   - Error boundaries configured in production
   - Auth state errors handled in AuthProvider

## Common Patterns

### Authentication Flow

```tsx
const { isReady, isAuthenticated, connect, disconnect } = useAuth()
```

### Wallet Management

```tsx
const privyWallet = usePrivyWallet()
const { address, chainId, isConnected } = privyWallet
```

### Social Linking

```tsx
const { handleLink, handleUnlink } = useSocialLinking(verifiedPlatforms)
```

## Best Practices

1. State Management

   - Use auth context for authentication state
   - Use query client for server state
   - Use local state for UI-only state

2. Error Handling

   - Always handle authentication errors
   - Provide user feedback for wallet operations
   - Use toast notifications for user feedback

3. Performance
   - Avoid unnecessary provider rerenders
   - Use proper dependency arrays in hooks
   - Leverage query caching appropriately

## Testing

The provider structure can be tested using:

- `test-auth.ts` utility for auth flows
- `auth-test.tsx` component for UI testing
- Jest for unit testing
- Cypress for E2E testing

## Related Files

- `/app/lib/providers/index.tsx` - Main provider composition
- `/app/lib/providers/privy.tsx` - Privy configuration
- `/app/lib/providers/auth-provider.tsx` - Custom auth state
- `/app/lib/utils/wagmi.ts` - Wagmi configuration
- `/app/lib/hooks/usePrivyWallet.ts` - Wallet management
- `/app/lib/hooks/usePrivySocialLinking.ts` - Social account linking
