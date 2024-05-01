/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExtendedSimpleEdgeData } from './ExtendedSimpleEdgeData';
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
     * Source node object
     */
    sourceNode: NodeData;
    /**
     * Target node object
     */
    targetNode: NodeData;
    actualEdges: Array<ExtendedSimpleEdgeData>;
};

