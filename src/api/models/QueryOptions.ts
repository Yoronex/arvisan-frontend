/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Partial_Range_ } from './Partial_Range_';

export type QueryOptions = {
    id: string;
    layerDepth: number;
    dependencyDepth: number;
    showSelectedInternalRelations?: boolean;
    showDomainInternalRelations?: boolean;
    showExternalRelations?: boolean;
    showOutgoing?: boolean;
    showIncoming?: boolean;
    outgoingRange?: Partial_Range_;
    incomingRange?: Partial_Range_;
    selfEdges?: boolean;
    showWeakDependencies?: boolean;
    showStrongDependencies?: boolean;
    showEntityDependencies?: boolean;
};
