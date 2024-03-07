import { NodeData } from '../api';

export function nodeToString(node?: NodeData) {
  if (!node) return '';
  return `(${node.properties.layer}) ${node.label}`;
}
