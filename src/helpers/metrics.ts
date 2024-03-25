import cytoscape from 'cytoscape';

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

  return 1 - (dependencyProfile[1] + dependencyProfile[3]) / dependencyProfileSum;
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

  return 1 - (dependencyProfile[2] + dependencyProfile[3]) / dependencyProfileSum;
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
  return outgoing !== 0 ? incoming / outgoing : 0;
}

/**
 * Given a node, get its (total) file size in KB
 * @param node
 */
export function getFileSizeKB(node: cytoscape.NodeSingular): number {
  return node.data('properties.fileSizeKB') ?? Number.NaN;
}
