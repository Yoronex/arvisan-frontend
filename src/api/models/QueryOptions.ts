/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type QueryOptions = {
    layerDepth: number;
    dependencyLength: number;
    /**
     * Query relationships that are contained within the selection
     */
    showSelectedInternalRelations?: boolean;
    /**
     * Query relationships that are contained within the selection's domain
     */
    showDomainInternalRelations?: boolean;
    /**
     * Query relationships that are not contained within the selection's domain
     */
    showExternalRelations?: boolean;
    /**
     * Whether to include applications that existing in the unclassified domain. True by default
     */
    includeUnclassifiedApplications?: boolean;
    /**
     * Query outgoing relationships from the starting point
     */
    showOutgoing?: boolean;
    /**
     * Query incoming relationships from the starting point
     */
    showIncoming?: boolean;
    outgoingRangeMin?: number;
    outgoingRangeMax?: number;
    incomingRangeMin?: number;
    incomingRangeMax?: number;
    /**
     * Return relationships that (after lifting) depend on itself
     */
    selfEdges?: boolean;
    showRuntimeDependencies?: boolean;
    showCompileTimeDependencies?: boolean;
    showEntityDependencies?: boolean;
};
