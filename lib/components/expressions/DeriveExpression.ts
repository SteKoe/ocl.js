import { Expression } from './Expression';
import { OclVisitor } from '../OclVisitor';

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

    visit(visitor: OclVisitor): any {
        return visitor.visitDeriveExpression(this);
    }
}
