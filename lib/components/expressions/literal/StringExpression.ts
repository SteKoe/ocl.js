import { LiteralExpression } from './LiteralExpression';
import { OclVisitor } from '../../OclVisitor';

/**
 */
export class StringExpression extends LiteralExpression<string> {
    parseValue(value): string {
        return value.replace(/^\"|"$/g, '');
    }

    visit(visitor: OclVisitor): any {
        return visitor.visitLiteralExpression(this);
    }
}
