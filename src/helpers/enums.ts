export enum VisibilityOptions {
  HIGHLIGHTED = 0,
  VISIBLE = 1,
  INVISIBLE = 2,
}

export enum VisualizationAlgorithm {
  GRID = 'grid',
  KLAY = 'klay',
  COLA = 'cola',
}

export enum GraphColoringMode {
  STRUCTURE,
  INCOMING_DEPENDENCIES,
  OUTGOING_DEPENDENCIES,
  INCOMING_OUTGOING_DEPS_RATIO,
  DEPENDENCY_PROFILE,
}
