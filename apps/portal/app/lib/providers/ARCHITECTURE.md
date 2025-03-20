# Provider Architecture Diagram

```mermaid
graph TD
    A[App Root] --> B[PrivyConfig]
    B --> C[QueryClientProvider]
    C --> D[WagmiProvider]
    D --> E[AuthProvider]
    E --> F[HydrationBoundary]
    F --> G[Application Components]

    subgraph "Authentication Layer"
    B
    D
    E
    end

    subgraph "Data Layer"
    C
    F
    end

    subgraph "Component Layer"
    G
    end

    %% Data Flow
    H[Wallet State] --> B
    I[Server State] --> C
    J[Chain State] --> D
    K[Auth State] --> E
    L[Hydrated State] --> F

    %% Hooks
    M[usePrivy] --> B
    N[useQuery] --> C
    O[useWagmi] --> D
    P[useAuth] --> E

    classDef provider fill:#f9f,stroke:#333,stroke-width:2px
    classDef layer fill:#dfd,stroke:#333,stroke-width:2px
    classDef state fill:#ddf,stroke:#333,stroke-width:2px
    classDef hook fill:#ffd,stroke:#333,stroke-width:2px

    class B,C,D,E,F provider
    class H,I,J,K,L state
    class M,N,O,P hook
```

## Data Flow

1. **Authentication Flow**

   ```mermaid
   sequenceDiagram
       participant U as User
       participant P as PrivyConfig
       participant W as WagmiProvider
       participant A as AuthProvider

       U->>P: Connect Wallet
       P->>W: Update Chain State
       W->>A: Update Auth State
       A->>U: Connected State
   ```

2. **Data Fetching Flow**

   ```mermaid
   sequenceDiagram
       participant C as Component
       participant Q as QueryClientProvider
       participant H as HydrationBoundary
       participant S as Server

       C->>Q: Request Data
       Q->>S: Fetch Data
       S->>H: Return Data
       H->>C: Hydrated Data
   ```

## State Management

```mermaid
stateDiagram-v2
    [*] --> Disconnected
    Disconnected --> Connecting: Connect Wallet
    Connecting --> Connected: Wallet Ready
    Connected --> Authenticated: Sign Message
    Authenticated --> Loading: Fetch Data
    Loading --> Ready: Data Loaded
    Ready --> [*]
```

## Provider Dependencies

```mermaid
graph LR
    A[PrivyConfig] --> B[WagmiProvider]
    B --> C[AuthProvider]
    D[QueryClientProvider] --> E[HydrationBoundary]

    subgraph "Required Order"
    A --> B --> C
    D --> E
    end
```
