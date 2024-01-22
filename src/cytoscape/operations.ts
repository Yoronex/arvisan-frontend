/* Given a node, assign the node its correct color
   * @param n
   */
import { shadeHexColor } from '../helpers/color';
import { EdgeData, NodeData } from '../api';

export function colorNodes(n: cytoscape.NodeSingular): void {
  const hexColor = n.data('properties.color') as NodeData['properties']['color'];
  if (!hexColor) return;
  const depth = Number(n.data('properties.depth'));
  const alpha = (4 - depth) * 0.15;
  const lightened = shadeHexColor(hexColor, alpha);
  n.style('background-color', lightened);
}

/**
 * Given an edge, assign the edge its correct edge weight
 */
export function assignEdgeWeights(e: cytoscape.EdgeSingular): void {
  const weight = e.data('properties.weight') as EdgeData['properties']['weight'];
  if (!weight) return;
  e.style('width', 1.5 * Math.sqrt(weight));
}
