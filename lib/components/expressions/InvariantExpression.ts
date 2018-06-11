import { Expression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';

/**
 */
export class InvariantExpression extends Expression {
    private name: string;
    private definition: Expression;

    constructor(oclExpression, name) {
        super();
        this.name = name || 'anonymous';
        this.definition = oclExpression;
    }

    getName(): string {
        return this.name;
    }

    getDefinition(): any {
        return this.definition;
    }

    evaluate(visitor: OclExecutionContext): any {
        return this.getDefinition()
            .evaluate(visitor);
    }
}
