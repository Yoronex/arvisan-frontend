/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Domain } from '../models/Domain';
import type { GraphLayer } from '../models/GraphLayer';
import type { GraphWithViolations } from '../models/GraphWithViolations';
import type { QueryOptions } from '../models/QueryOptions';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GraphService {

    /**
     * @param requestBody 
     * @returns GraphWithViolations Ok
     * @throws ApiError
     */
    public static getNode(
requestBody: QueryOptions,
): CancelablePromise<GraphWithViolations> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/graph/node',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

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

}
