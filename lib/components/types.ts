/**
 * Common type definitions for ocl.js
 */

/**
 * Local variables passed through the evaluation chain.
 * Contains iterator variables, let bindings, and special variables like 'self'.
 */
export type LocalVariables = Record<string, unknown>;

/**
 * Registry of custom types that can be used in oclIsKindOf/oclIsTypeOf checks.
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type TypeRegistry = Record<string, Function | (new (...args: any[]) => any)>;

/**
 * Registry of enumerations used in OCL expressions.
 */
export type EnumRegistry = Record<string, Record<string, unknown>>;

/**
 * Result of evaluating left and right expressions.
 */
export interface LeftRightResult {
    left: unknown;
    right: unknown;
}

/**
 * Result of evaluating source and body expressions.
 */
export interface SourceBodyResult {
    source: unknown;
    body: unknown;
}
