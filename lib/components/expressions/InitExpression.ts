import {Expression} from "./Expression";
import {OclVisitor} from "../OclVisitor";

/**
 */
export class InitExpression extends Expression {
    private value: any;

    constructor(value) {
        super();
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    visit(visitor: OclVisitor) {
        return visitor.visitInitExpression(this);
    }
}