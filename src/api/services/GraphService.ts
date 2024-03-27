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
showOutgoing,
showIncoming,
outgoingRangeMin,
outgoingRangeMax,
incomingRangeMin,
incomingRangeMax,
selfEdges,
showWeakDependencies,
showStrongDependencies,
showEntityDependencies,
}: {
id: string,
layerDepth: number,
dependencyLength: number,
showSelectedInternalRelations?: boolean,
showDomainInternalRelations?: boolean,
showExternalRelations?: boolean,
showOutgoing?: boolean,
showIncoming?: boolean,
outgoingRangeMin?: number,
outgoingRangeMax?: number,
incomingRangeMin?: number,
incomingRangeMax?: number,
selfEdges?: boolean,
showWeakDependencies?: boolean,
showStrongDependencies?: boolean,
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
                'showOutgoing': showOutgoing,
                'showIncoming': showIncoming,
                'outgoingRangeMin': outgoingRangeMin,
                'outgoingRangeMax': outgoingRangeMax,
                'incomingRangeMin': incomingRangeMin,
                'incomingRangeMax': incomingRangeMax,
                'selfEdges': selfEdges,
                'showWeakDependencies': showWeakDependencies,
                'showStrongDependencies': showStrongDependencies,
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
