import { Expression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';

/**
 */
export class LetExpression extends Expression {
    private key: string;
    private value: Expression;

    constructor(key, value) {
        super();
        this.key = key;
        this.value = value;
    }

    getKey(): string {
        return this.key;
    }

    getValue(): Expression {
        return this.value;
    }

    evaluate(visitor: OclExecutionContext): any {
        visitor.getObjectToEvaluate()[this.getKey()] = this.getValue()
            .evaluate(visitor);
    }
}
