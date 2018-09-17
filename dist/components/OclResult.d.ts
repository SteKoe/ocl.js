import { ContextExpression } from './expressions/context/ContextExpression';
/**
 * This class is a data class that is returned by OclEngine.evaluate method.
 *
 * It contains useful information about the evaluation result like the actual result (true / false) and in addition a list
 * of all names of invariants that have failed.
 */
export declare class OclResult {
    private namesOfFailedInvs;
    private evaluatedContexts;
    private result;
    constructor(namesOfFailedInvs: Array<string>, evaluatedContexts: Array<ContextExpression>);
    /**
     * @returns true if the OCL constraint did pass, false otherwise.
     */
    getResult(): boolean;
    /**
     * @returns An array of names of all failed invariants.
     */
    getNamesOfFailedInvs(): Array<string>;
    /**
     * @returns An array of contexts that have been executed during evaluation.
     */
    getEvaluatedContexts(): Array<ContextExpression>;
}
