/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DependencyType } from './DependencyType';
import type { EdgeReferences } from './EdgeReferences';
import type { EdgeViolations } from './EdgeViolations';
export type EdgeDataProperties = {
    /**
     * Whether this edge is some architectural violation
     */
    violations: (EdgeViolations & {
        any: boolean;
    });
    /**
     * Actual references in OutSystems
     */
    references: Array<EdgeReferences>;
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

