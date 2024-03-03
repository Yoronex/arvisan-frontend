/* Given a node, assign the node its correct color
   * @param n
   */
import { EdgeData } from '../api';

/**
 * Given an edge, assign the edge its correct edge weight
 */
export function assignEdgeWeights(e: cytoscape.EdgeSingular): void {
  const weight = e.data('properties.weight') as EdgeData['properties']['weight'];
  if (!weight) return;
  e.style('width', 1.5 * Math.sqrt(weight));
}
