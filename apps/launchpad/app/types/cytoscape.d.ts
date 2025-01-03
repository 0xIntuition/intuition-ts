declare module 'cytoscape' {
  import cytoscape from 'cytoscape'
  export = cytoscape
}

declare module 'cytoscape-cola' {
  import { Core } from 'cytoscape'
  function cola(cy: Core): void
  export = cola
}

declare module 'cytoscape-popper' {
  import { Core } from 'cytoscape'
  function popper(cy: Core): void
  export = popper
}

// Augment cytoscape's Core interface to include the popper method
declare module 'cytoscape' {
  interface Core {
    popper(): void
  }
}
