import { Expression } from './Expression';
import { OclVisitor } from '../OclVisitor';

/**
 */
export class InitExpression extends Expression {
    private value: any;

    constructor(value) {
        super();
        this.value = value;
    }

    getValue(): any {
        return this.value;
    }

    visit(visitor: OclVisitor): any {
        return visitor.visitInitExpression(this);
    }
}
