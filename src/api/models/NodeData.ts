/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

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
 * Type of node
 */
kind: string;
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
