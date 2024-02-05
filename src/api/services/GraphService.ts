/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Domain } from '../models/Domain';
import type { Graph } from '../models/Graph';
import type { QueryOptions } from '../models/QueryOptions';

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
     * @param requestBody 
     * @returns any Ok
     * @throws ApiError
     */
    public static getNode(
requestBody: QueryOptions,
): CancelablePromise<(Graph | {
message: string;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/graph/node',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
