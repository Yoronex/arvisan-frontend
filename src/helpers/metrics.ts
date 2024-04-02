import cytoscape from 'cytoscape';
import { NodeData } from '../api';

/**
 * Given a node's dependency profile, get the average application inbound encapsulation score
 * (how much is relatively imported from external modules).
 * @param dependencyProfile Quadruple of [HIDDEN, INBOUND, OUTBOUND, TRANSIT].
 * @returns Inbound encapsulation score in the range [0, 1]. Higher score means better
 * encapsulation within applications.
 */
export function getInboundEncapsulation(dependencyProfile: number[]): number {
  if (dependencyProfile.length !== 4) throw new Error(`Invalid dependency profile supplied. Should have 4 values, but received ${dependencyProfile.length} instead.`);
  const dependencyProfileSum = dependencyProfile.reduce((total, x) => total + x, 0);

  return (dependencyProfile[1] + dependencyProfile[3]) / dependencyProfileSum;
}

/**
 * Given a node's dependency profile, get the average application outbound encapsulation score
 * (how much is relatively exported to external modules).
 * @param dependencyProfile Quadruple of [HIDDEN, INBOUND, OUTBOUND, TRANSIT].
 * @returns Outbound encapsulation score in the range [0, 1]. Higher score means better
 * encapsulation within applications.
 */
export function getOutboundEncapsulation(dependencyProfile: number[]): number {
  if (dependencyProfile.length !== 4) throw new Error(`Invalid dependency profile supplied. Should have 4 values, but received ${dependencyProfile.length} instead.`);
  const dependencyProfileSum = dependencyProfile.reduce((total, x) => total + x, 0);

  return (dependencyProfile[2] + dependencyProfile[3]) / dependencyProfileSum;
}

/**
 * Given a node, get the number of incoming dependencies
 * @param node
 */
export function getNrIncomingFunctionDeps(node: cytoscape.NodeSingular): number {
  return node.incomers().filter((ele) => ele.isEdge())
    .reduce((val, edge) => val + Number(edge.data('properties.nrFunctionDependencies')), 0);
}

/**
 * Given a node, get the number of outgoing dependencies
 * @param node
 */
export function getNrOutgoingFunctionDeps(node: cytoscape.NodeSingular): number {
  return node.outgoers().filter((ele) => ele.isEdge())
    .reduce((val, edge) => val + Number(edge.data('properties.nrFunctionDependencies')), 0);
}

/**
 * Given a node, get the ratio of incoming/outgoing dependencies
 * @param node
 */
export function getIncomingOutgoingDifference(node: cytoscape.NodeSingular): number {
  const incoming = getNrIncomingFunctionDeps(node);
  const outgoing = getNrOutgoingFunctionDeps(node);
  return outgoing !== 0 ? incoming - outgoing : 0;
}

/**
 * Given a node, get its (total) file size in KB
 * @param node
 */
export function getFileSizeKB(node: cytoscape.NodeSingular): number {
  return node.data('properties.fileSizeKB') ?? Number.NaN;
}

export function getNrScreens(node: cytoscape.NodeSingular): number {
  return node.data('properties.nrScreens') as NodeData['properties']['nrScreens'] ?? Number.NaN;
}

export function getNrEntities(node: cytoscape.NodeSingular): number {
  return node.data('properties.nrEntities') as NodeData['properties']['nrEntities'] ?? Number.NaN;
}

type IBaseMetric = {
  name: string;
  /**
   * Whether the metric is calculated in context of the visualization or the complete graph.
   * If the former, the result will depend on the user's visualization settings.
   */
  context: 'visualization' | 'graph',
  description?: string;
  nodeDetailsTitle: string;
  /** The value that needs to be shown in the node details list. NULL if hidden */
  nodeDetailsValue: (node: cytoscape.NodeSingular) => number | string | null;
};
export type IRatioMetric = IBaseMetric & {
  type: 'ratio',
  colors: string[],
  /** Function that defines the min and max values. Undefined if between [0, 1] */
  rangeFunction?: (nodes: cytoscape.NodeCollection) => [number, number];
  /** Function that determines a node's color, undefined if not applicable */
  colorFunction?: (node: cytoscape.NodeSingular, range: [number, number]) => string;
  /** Function that determines a node's size, undefined if not applicable, i.e. when parent-only */
  sizeFunction?: (node: cytoscape.NodeSingular, range: [number, number]) => string | number;
};
export type ICategoryMetric = IBaseMetric & {
  type: 'category',
  /** Mapping (hex color => label) */
  legend: Map<string, string>;
  /** Function that determines a node's color, undefined if not applicable */
  colorFunction?: (node: cytoscape.NodeSingular) => string;
  /** Function that determines a node's size, undefined if not applicable, i.e. when parent-only */
  sizeFunction?: (node: cytoscape.NodeSingular) => string | number;
};
export type IMetricSettings = (IRatioMetric | ICategoryMetric);
