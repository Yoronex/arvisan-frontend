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
