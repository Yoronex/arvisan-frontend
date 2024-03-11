import cytoscape from 'cytoscape';
import { EdgeData } from '../api';

/**
 * Given an edge, assign the edge its correct edge weight
 */
export function assignEdgeWeights(e: cytoscape.EdgeSingular): void {
  const weight = e.data('properties.weight') as EdgeData['properties']['weight'];
  if (!weight) return;
  e.style('width', Math.sqrt(weight));
}

/**
 * Given a node, get the number of incoming dependencies
 * @param node
 */
export function getNrIncomingFunctionDeps(node: cytoscape.NodeSingular): number {
  // const children = node.children().filter((ele) => ele.isNode()) as cytoscape.NodeCollection;
  // if (children.length > 0) {
  //   return children.reduce((total, child) => total + getNrIncomingDeps(child), 0);
  // }
  return node.incomers().filter((ele) => ele.isEdge())
    .reduce((val, edge) => val + Number(edge.data('properties.nrFunctionDependencies')), 0);
}

/**
 * Given a node, get the number of outgoing dependencies
 * @param node
 */
export function getNrOutgoingFunctionDeps(node: cytoscape.NodeSingular): number {
  // const children = node.children().filter((ele) => ele.isNode()) as cytoscape.NodeCollection;
  // if (children.length > 0) {
  //   return children.reduce((total, child) => total + getNrOutgoingDeps(child), 0);
  // }
  return node.outgoers().filter((ele) => ele.isEdge())
    .reduce((val, edge) => val + Number(edge.data('properties.nrFunctionDependencies')), 0);
}

/**
 * Given a node, get the ratio of incoming/outgoing dependencies
 * @param node
 */
export function getIncomingOutgoingRatio(node: cytoscape.NodeSingular): number {
  const incoming = getNrIncomingFunctionDeps(node);
  const outgoing = getNrOutgoingFunctionDeps(node);
  return outgoing !== 0 ? incoming / outgoing : 0;
}
