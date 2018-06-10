import { ContextExpression } from './expressions/context/ContextExpression';

/**
 * This class is a data class that is returned by OclEngine.evaluate method.
 *
 * It contains useful information about the evaluation result like the actual result (true / false) and in addition a list
 * of all names of invariants that have failed.
 */
export class OclResult {
    private result: any;

    constructor(private namesOfFailedInvs: Array<string>, private evaluatedContexts: Array<ContextExpression>) {
        this.result = namesOfFailedInvs.length === 0;
    }

    getResult(): any {
        return this.result;
    }

    getNamesOfFailedInvs(): Array<string> {
        return this.namesOfFailedInvs;
    }

    getEvaluatedContexts(): Array<ContextExpression> {
        return this.evaluatedContexts;
    }
}
