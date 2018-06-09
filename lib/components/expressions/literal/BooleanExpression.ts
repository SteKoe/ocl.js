import {LiteralExpression} from "./LiteralExpression";
import {OclVisitor} from "../../OclVisitor";

/**
 */
export class BooleanExpression extends LiteralExpression<boolean> {
    parseValue(value) {
        return JSON.parse(value);
    }

    visit(visitor: OclVisitor) {
        return visitor.visitLiteralExpression(this);
    }
}
