/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Partial_Range_ } from './Partial_Range_';

export type QueryOptions = {
    id: string;
    layerDepth: number;
    dependencyDepth: number;
    onlyInternalRelations?: boolean;
    onlyExternalRelations?: boolean;
    showDependencies?: boolean;
    showDependents?: boolean;
    dependencyRange?: Partial_Range_;
    dependentRange?: Partial_Range_;
    selfEdges?: boolean;
};
