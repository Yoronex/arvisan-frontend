export interface Option {
  label: string;
  id: string | number;
}

export function searchNodes<T extends Option>(nodes: T[], searchKey: string): T[] {
  return nodes.filter((n) => {
    const nameSpaces = n.label.replaceAll('_', ' ');
    return n.label.toLowerCase().includes(searchKey.toLowerCase())
      || nameSpaces.toLowerCase().includes(searchKey.toLowerCase());
  });
}
