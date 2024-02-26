/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DependencyCycle } from './DependencyCycle';
import type { ExtendedEdgeData } from './ExtendedEdgeData';
import type { NodeData } from './NodeData';

export type DependencyCycleRender = {
    node: NodeData;
    path: Array<ExtendedEdgeData>;
    length: number;
    actualCycles: Array<DependencyCycle>;
    id: string;
};
