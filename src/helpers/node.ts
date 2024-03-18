import { NodeData } from '../api';

export function nodeToString(node?: NodeData) {
  if (!node) return '';
  return `(${node.properties.layer}) ${node.label}`;
}

/**
 * Given a node, get its parents (including the node itself)
 * @param node
 * @param nodes List of all known/available nodes
 */
export function getParents(node: NodeData, nodes: NodeData[]): NodeData[] {
  if (node.parent === undefined) return [node];
  const parent = nodes.find((n) => n.id === node.parent);
  if (!parent) return [node];
  return [node, ...getParents(parent, nodes)];
}
