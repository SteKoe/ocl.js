import {OclExecutionContext} from '../OclExecutionContext';

export abstract class Expression {
    private readonly type: string;

    constructor() {
        this.type = this.constructor.name;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    accept(obj?: OclExecutionContext): boolean {
        return true;
    }

    abstract evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}

