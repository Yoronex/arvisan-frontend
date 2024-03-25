/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ModuleDependencyProfileCategory } from './ModuleDependencyProfileCategory';

export type NodeData = {
    /**
     * Unique node identifier
     */
    id: string;
    /**
     * Node label (name)
     */
    label: string;
    /**
     * ID of the parent node (if it exists)
     */
    parent?: string;
    /**
     * Custom properties of node
     */
    properties: {
/**
 * How many lowest-layer nodes are contained in this node.
 * 1 if node itself is a leaf.
 * Undefined if it cannot be calculated
 */
nrLeaves?: number;
nrRESTProducers?: number;
nrRESTConsumers?: number;
nrPublicElements?: number;
nrEntities?: number;
nrScreens?: number;
fileSizeKB?: number;
/**
 * Dependency profile of the given node. Quadruple of four categories
 * [hidden, inbound, outbound, transit] if internal (tree) node. Undefined if leaf node.
 */
dependencyProfile: Array<number>;
/**
 * The type of dependency profile this node is. Only for bottom-layer nodes
 */
dependencyProfileCategory?: ModuleDependencyProfileCategory;
/**
 * Whether this node is selected or not
 */
selected: NodeData.selected;
/**
 * Node layer depth
 */
depth: number;
/**
 * Hex color this node should be
 */
color: string;
/**
 * Layer this node is in
 */
layer: string;
/**
 * Full name of the node (including prefixes)
 */
fullName: string;
};
};

export namespace NodeData {

    /**
     * Whether this node is selected or not
     */
    export enum selected {
        TRUE = 'true',
        FALSE = 'false',
    }


}
