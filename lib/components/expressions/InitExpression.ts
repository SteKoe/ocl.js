import { Expression } from './Expression';
import { IOclVisitor } from '../IOclVisitor';

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

    visit(visitor: IOclVisitor): any {
        return visitor.visitInitExpression(this);
    }
}
