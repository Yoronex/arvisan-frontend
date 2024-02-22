/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

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
 * Whether this edge is some architectural violation
 */
violations: EdgeViolations;
/**
 * Edge weight
 */
weight: number;
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
