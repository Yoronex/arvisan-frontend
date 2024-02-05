/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GitCommitInfo } from '../models/GitCommitInfo';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RootService {

    /**
     * @returns GitCommitInfo Ok
     * @throws ApiError
     */
    public static getBackendVersion(): CancelablePromise<GitCommitInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/version',
        });
    }

}
