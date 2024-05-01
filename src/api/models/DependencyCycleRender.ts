/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DependencyCycle } from './DependencyCycle';
import type { ExtendedSimpleEdgeData } from './ExtendedSimpleEdgeData';
import type { NodeData } from './NodeData';
export type DependencyCycleRender = {
    node: NodeData;
    path: Array<ExtendedSimpleEdgeData>;
    length: number;
    actualCycles: Array<DependencyCycle>;
    id: string;
};

