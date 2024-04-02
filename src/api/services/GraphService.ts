/* generated using openapi-typescript-codegen -- do no edit */
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
