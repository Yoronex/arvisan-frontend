import { NodeData } from '../api';

// eslint-disable-next-line import/prefer-default-export
export function searchNodes(nodes: NodeData[], searchKey: string) {
  return nodes.filter((n) => {
    const nameSpaces = n.label.replaceAll('_', ' ');
    return n.label.toLowerCase().includes(searchKey.toLowerCase())
      || nameSpaces.toLowerCase().includes(searchKey.toLowerCase());
  });
}
