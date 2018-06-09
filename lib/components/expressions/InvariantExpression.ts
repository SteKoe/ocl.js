import {Expression} from "./Expression";
import {OclVisitor} from "../OclVisitor";

/**
 */
export class InvariantExpression extends Expression {
    private name: string;
    private definition: any;

    constructor(oclExpression, name) {
        super();
        this.name = name || 'anonymous';
        this.definition = oclExpression;
    }

    getName() {
        return this.name;
    }

    getDefinition() {
        return this.definition;
    }

    visit(visitor: OclVisitor) {
        return visitor.visitInvariantExpression(this);
    }
}
