import { Expression } from './Expression';
import { IOclVisitor } from '../IOclVisitor';

/**
 * A derived value expression is an expression that may be linked to a property
 */
export class DeriveExpression extends Expression {
    private value: any;

    constructor(value) {
        super();
        this.value = value;
    }

    getValue(): any {
        return this.value;
    }

    visit(visitor: IOclVisitor): any {
        return visitor.visitDeriveExpression(this);
    }
}
