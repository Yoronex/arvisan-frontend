/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Edge } from './Edge';
import type { Node } from './Node';

/**
 * Graph as labelled property graph (cytoscape.js format)
 */
export type Graph = {
    name: string;
    nodes: Array<Node>;
    edges: Array<Edge>;
};
