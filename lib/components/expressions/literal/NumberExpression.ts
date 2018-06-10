import { LiteralExpression } from './LiteralExpression';
import { IOclVisitor } from '../../IOclVisitor';

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

    visit(visitor: IOclVisitor): any {
        return visitor.visitLiteralExpression(this);
    }
}
