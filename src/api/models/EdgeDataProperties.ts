/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DependencyType } from './DependencyType';
import type { EdgeViolations } from './EdgeViolations';

export type EdgeDataProperties = {
    /**
     * Edge reference key (from OutSystems)
     * @deprecated
     */
    referenceKeys: Array<string>;
    /**
     * Weight of the edge
     * @deprecated
     */
    weight: number;
    /**
     * Whether this edge is some architectural violation
     */
    violations: (EdgeViolations & {
any: boolean;
});
    /**
     * Names of the actual references in OutSystems
     */
    referenceNames: Array<string>;
    /**
     * Type of reference used within OutSystems
 * (e.g. Action, Entity, Integration, WebBlock, etc.)
     */
    referenceTypes: Array<string>;
    /**
     * Type of dependency
     */
    dependencyTypes: Array<DependencyType>;
    /**
     * How many module-level dependencies exist within the source and target node
     */
    nrModuleDependencies: number;
    /**
     * How many actual, function-level dependencies exist within the source and target node
     */
    nrFunctionDependencies: number;
    /**
     * How many times the "weak" relationships are called in the
 * database-inserted timeframe. Undefined if no weak relationship
     */
    nrCalls?: number;
};
