/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DependencyType } from './DependencyType';
import type { EdgeViolations } from './EdgeViolations';
import type { ExtendedEdgeData } from './ExtendedEdgeData';
import type { NodeData } from './NodeData';

export type LayerViolation = {
    /**
     * Unique edge identifier
     */
    id: string;
    /**
     * Identifier of source node
     */
    source: string;
    /**
     * Identifier of target node
     */
    target: string;
    /**
     * Edge label
     */
    interaction: string;
    /**
     * Custom properties
     */
    properties: {
/**
 * How many times the "weak" relationships are called in the
 * database-inserted timeframe. Undefined if no weak relationship
 */
nrCalls?: number;
/**
 * How many actual, function-level dependencies exist within the source and target node
 */
nrFunctionDependencies: number;
/**
 * How many module-level dependencies exist within the source and target node
 */
nrModuleDependencies: number;
/**
 * Type of dependency
 */
dependencyTypes: Array<DependencyType>;
/**
 * Type of reference used within OutSystems
 * (e.g. Action, Entity, Integration, WebBlock, etc.)
 */
referenceTypes: Array<string>;
/**
 * Names of the actual references in OutSystems
 */
referenceNames: Array<string>;
/**
 * Whether this edge is some architectural violation
 */
violations: (EdgeViolations & {
any: boolean;
});
/**
 * Weight of the edge
 * @deprecated
 */
weight: number;
/**
 * Edge reference key (from OutSystems)
 * @deprecated
 */
referenceKeys: Array<string>;
};
    /**
     * Source node object
     */
    sourceNode: NodeData;
    /**
     * Target node object
     */
    targetNode: NodeData;
    actualEdges: Array<ExtendedEdgeData>;
};
