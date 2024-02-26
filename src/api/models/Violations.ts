/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DependencyCycleRender } from './DependencyCycleRender';
import type { LayerViolation } from './LayerViolation';

export type Violations = {
    dependencyCycles: Array<DependencyCycleRender>;
    subLayers: Array<LayerViolation>;
};
