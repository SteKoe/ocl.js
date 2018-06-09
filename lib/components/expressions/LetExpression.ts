import { Expression } from './Expression';
import { OclVisitor } from '../OclVisitor';

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

    visit(visitor: OclVisitor): any {
        return visitor.visitLetExpression(this);
    }
}
