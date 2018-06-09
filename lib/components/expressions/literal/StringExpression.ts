import {LiteralExpression} from "./LiteralExpression";
import {OclVisitor} from "../../OclVisitor";

/**
 */
export class StringExpression extends LiteralExpression<string> {
    parseValue(value) {
        return value.replace(/^\"|\"$/g, '');
    }

    visit(visitor: OclVisitor) {
        return visitor.visitLiteralExpression(this);
    }
}
