import { ContextExpression } from './expressions/context/ContextExpression';

/**
 * This class is a data class that is returned by OclEngine.evaluate method.
 *
 * It contains useful information about the evaluation result like the actual result (true / false) and in addition a list
 * of all names of invariants that have failed.
 */
export class OclResult {
    private readonly result: boolean;

    constructor(private namesOfFailedInvs: Array<string>, private evaluatedContexts: Array<ContextExpression>) {
        this.result = namesOfFailedInvs.length === 0;
    }

    /**
     * @returns true if the OCL constraint did pass, false otherwise.
     */
    getResult(): boolean {
        return this.result;
    }

    /**
     * @returns An array of names of all failed invariants.
     */
    getNamesOfFailedInvs(): Array<string> {
        return this.namesOfFailedInvs;
    }

    /**
     * @returns An array of contexts that have been executed during evaluation.
     */
    getEvaluatedContexts(): Array<ContextExpression> {
        return this.evaluatedContexts;
    }
}
