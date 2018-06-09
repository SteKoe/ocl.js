import {LiteralExpression} from "./LiteralExpression";
import {OclVisitor} from "../../OclVisitor";

/**
 */
export class NumberExpression extends LiteralExpression<number> {
    parseValue(value) {
        if (!isNaN(+value)) {
            return +value;
        } else {
            throw new SyntaxError(`NumberExpression: '${value}' is not a Number!`);
        }
    }

    visit(visitor: OclVisitor) {
        return visitor.visitLiteralExpression(this);
    }
}
