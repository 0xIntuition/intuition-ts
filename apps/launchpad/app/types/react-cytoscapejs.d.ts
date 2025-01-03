declare module 'react-cytoscapejs' {
  import type { Core, CytoscapeOptions, Stylesheet } from 'cytoscape'
  import type { ComponentType } from 'react'

  interface CytoscapeComponentProps
    extends Omit<CytoscapeOptions, 'container'> {
    cy?: (cy: Core) => void
    style?: React.CSSProperties
    stylesheet?: Stylesheet[]
  }

  const CytoscapeComponent: ComponentType<CytoscapeComponentProps>
  export default CytoscapeComponent
}
