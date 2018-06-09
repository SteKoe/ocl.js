import { LiteralExpression } from './LiteralExpression';
import { OclVisitor } from '../../OclVisitor';

/**
 */
export class NumberExpression extends LiteralExpression<number> {
    parseValue(value): number {
        if (!isNaN(+value)) {
            return +value;
        } else {
            throw new SyntaxError(`NumberExpression: '${value}' is not a Number!`);
        }
    }

    visit(visitor: OclVisitor): any {
        return visitor.visitLiteralExpression(this);
    }
}
