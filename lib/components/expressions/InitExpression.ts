import { OclExecutionContext } from '../OclExecutionContext';

import { Expression } from './Expression';

/**
 */
export class InitExpression extends Expression {
    private value: any;

    constructor(value) {
        super();
        this.value = value;
    }

    getValue(): Expression {
        return this.value;
    }

    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        return this.getValue().evaluate(visitor, localVariables);
    }
}
