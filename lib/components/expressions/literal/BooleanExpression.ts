import { LiteralExpression } from './LiteralExpression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 */
export class BooleanExpression extends LiteralExpression<boolean> {
    parseValue(value): boolean {
        return JSON.parse(value);
    }

    visit(visitor: IOclVisitor): any {
        return visitor.visitLiteralExpression(this);
    }
}
