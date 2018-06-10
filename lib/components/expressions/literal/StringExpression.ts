import { LiteralExpression } from './LiteralExpression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 */
export class StringExpression extends LiteralExpression<string> {
    parseValue(value): string {
        return value.replace(/^\"|"$/g, '');
    }

    visit(visitor: IOclVisitor): any {
        return visitor.visitLiteralExpression(this);
    }
}
