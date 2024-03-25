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
