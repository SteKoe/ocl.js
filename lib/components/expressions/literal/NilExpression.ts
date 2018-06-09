import {LiteralExpression} from './index'
import {OclVisitor} from "../../OclVisitor";

export class NilExpression extends LiteralExpression<void> {
    constructor() {
        super(undefined);
    }

    parseValue() {
        return;
    }

    visit(visitor: OclVisitor) {
        return visitor.visitLiteralExpression(this);
    }
}
