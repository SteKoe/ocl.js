import { Expression } from './Expression';
import { IOclVisitor } from '../IOclVisitor';

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

    visit(visitor: IOclVisitor): any {
        return visitor.visitLetExpression(this);
    }
}
