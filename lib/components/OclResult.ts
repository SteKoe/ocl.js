import { ContextExpression } from './expressions/context/ContextExpression';
import { InvariantExpression } from './expressions';

/**
 * This class is a data class that is returned by OclEngine.evaluate method.
 *
 * It contains useful information about the evaluation result like the actual result (true / false) and in addition a list
 * of all names of invariants that have failed.
 */
export class OclResult {
    private result: boolean;
    private failedInvariantNames: Array<string>;

    constructor(private failedInvariants: Array<InvariantExpression>, private evaluatedContexts: Array<ContextExpression>) {
        this.result = failedInvariants.length === 0;
        this.failedInvariantNames = this.failedInvariants.map(i => i.getName());
    }

    /**
     * @returns true if the OCL constraint did pass, false otherwise.
     */
    getResult(): boolean {
        return this.result;
    }

    /**
     * @returns An array of all failed #{InvariantExpression}s
     */
    getFailedInvs(): Array<InvariantExpression> {
        return this.failedInvariants;
    }

    /**
     * @returns An array of names of all failed invariants.
     */
    getNamesOfFailedInvs(): Array<string> {
        return this.failedInvariantNames;
    }

    /**
     * @returns An array of contexts that have been executed during evaluation.
     */
    getEvaluatedContexts(): Array<ContextExpression> {
        return this.evaluatedContexts;
    }
}
