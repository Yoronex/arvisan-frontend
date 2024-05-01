/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Breadcrumb } from '../models/Breadcrumb';
import type { Domain } from '../models/Domain';
import type { GraphLayer } from '../models/GraphLayer';
import type { GraphWithViolations } from '../models/GraphWithViolations';
import type { NodeData } from '../models/NodeData';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GraphService {
    /**
     * @returns Domain Ok
     * @throws ApiError
     */
    public static getDomains(): CancelablePromise<Array<Domain>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/graph/domains',
        });
    }
    /**
     * @returns GraphLayer Ok
     * @throws ApiError
     */
    public static getLayers(): CancelablePromise<Array<GraphLayer>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/graph/layers',
        });
    }
    /**
     * Returns whether the graph parse and import endpoints are enabled, i.e.
     * whether the preconditions for the graph import controller are met.
     * @returns boolean Ok
     * @throws ApiError
     */
    public static canUseGraphImport(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/graph/import',
        });
    }
    /**
     * Given a set of input files, get a .zip file containing a set of nodes and a set of edges.
     * Note that this endpoint may take several minutes to complete.
     * @returns string Ok
     * @throws ApiError
     */
    public static parseGraph({
        formData,
    }: {
        formData?: {
            /**
             * Files containing the structure of the landscape
             * (domains, applications, sublayers, and modules).
             */
            structureFiles?: Array<Blob>;
            /**
             * Files containing consumers and producers.
             */
            dependencyFiles?: Array<Blob>;
            /**
             * Files containing more details about modules.
             */
            detailsFiles?: Array<Blob>;
            /**
             * Files containing dynamic data about integrations and service APIs.
             */
            integrationFiles?: Array<Blob>;
            /**
             * Whether the "Layer" layer from the OutSystems Architecture
             * Canvas should be included in the resulting graph
             */
            includeModuleLayerLayer?: string;
            /**
             * Whether the output graph should be anonymized
             */
            anonymize?: string;
        },
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/graph/import/parse',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * Drop the existing database and seed it with the provided set of nodes and edges.
     * Note that this endpoint may take several minutes to complete.
     * @returns void
     * @throws ApiError
     */
    public static importGraph({
        formData,
    }: {
        formData: {
            /**
             * Set of nodes
             */
            nodes: Blob;
            /**
             * Set of edges
             */
            relationships: Blob;
        },
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/graph/import/import',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @returns any Ok
     * @throws ApiError
     */
    public static getNodes({
        name = '',
    }: {
        name?: string,
    }): CancelablePromise<{
        count: number;
        records: Array<{
            data: NodeData;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/graph/nodes',
            query: {
                'name': name,
            },
        });
    }
    /**
     * @returns GraphWithViolations Ok
     * @throws ApiError
     */
    public static getNode({
        id,
        layerDepth,
        dependencyLength,
        showSelectedInternalRelations,
        showDomainInternalRelations,
        showExternalRelations,
        includeUnclassifiedApplications,
        showOutgoing,
        showIncoming,
        outgoingRangeMin,
        outgoingRangeMax,
        incomingRangeMin,
        incomingRangeMax,
        selfEdges,
        showRuntimeDependencies,
        showCompileTimeDependencies,
        showEntityDependencies,
    }: {
        id: string,
        layerDepth: number,
        dependencyLength: number,
        /**
         * Query relationships that are contained within the selection
         */
        showSelectedInternalRelations?: boolean,
        /**
         * Query relationships that are contained within the selection's domain
         */
        showDomainInternalRelations?: boolean,
        /**
         * Query relationships that are not contained within the selection's domain
         */
        showExternalRelations?: boolean,
        /**
         * Whether to include applications that existing in the unclassified domain. True by default
         */
        includeUnclassifiedApplications?: boolean,
        /**
         * Query outgoing relationships from the starting point
         */
        showOutgoing?: boolean,
        /**
         * Query incoming relationships from the starting point
         */
        showIncoming?: boolean,
        outgoingRangeMin?: number,
        outgoingRangeMax?: number,
        incomingRangeMin?: number,
        incomingRangeMax?: number,
        /**
         * Return relationships that (after lifting) depend on itself
         */
        selfEdges?: boolean,
        showRuntimeDependencies?: boolean,
        showCompileTimeDependencies?: boolean,
        showEntityDependencies?: boolean,
    }): CancelablePromise<GraphWithViolations> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/graph/nodes/{id}',
            path: {
                'id': id,
            },
            query: {
                'layerDepth': layerDepth,
                'dependencyLength': dependencyLength,
                'showSelectedInternalRelations': showSelectedInternalRelations,
                'showDomainInternalRelations': showDomainInternalRelations,
                'showExternalRelations': showExternalRelations,
                'includeUnclassifiedApplications': includeUnclassifiedApplications,
                'showOutgoing': showOutgoing,
                'showIncoming': showIncoming,
                'outgoingRangeMin': outgoingRangeMin,
                'outgoingRangeMax': outgoingRangeMax,
                'incomingRangeMin': incomingRangeMin,
                'incomingRangeMax': incomingRangeMax,
                'selfEdges': selfEdges,
                'showRuntimeDependencies': showRuntimeDependencies,
                'showCompileTimeDependencies': showCompileTimeDependencies,
                'showEntityDependencies': showEntityDependencies,
            },
        });
    }
    /**
     * @returns Breadcrumb Ok
     * @throws ApiError
     */
    public static getBreadcrumbOptions({
        id,
        layerDepth,
    }: {
        id: string,
        layerDepth: number,
    }): CancelablePromise<Array<Breadcrumb>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/graph/nodes/{id}/breadcrumbs',
            path: {
                'id': id,
            },
            query: {
                'layerDepth': layerDepth,
            },
        });
    }
}
