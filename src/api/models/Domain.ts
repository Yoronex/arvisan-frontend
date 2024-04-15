/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ModuleDependencyProfileCategory } from './ModuleDependencyProfileCategory';

export type Domain = {
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
 * Cohesion metric of leaves within this node
 */
cohesion?: number;
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
selected: Domain.selected;
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
    nrOutgoingDependencies: number;
    nrIncomingDependencies: number;
    nrInternalDependencies: number;
};

export namespace Domain {

    /**
     * Whether this node is selected or not
     */
    export enum selected {
        TRUE = 'true',
        FALSE = 'false',
    }


}
