import { LiteralExpression } from './LiteralExpression';
import { OclVisitor } from '../../OclVisitor';

/**
 */
export class BooleanExpression extends LiteralExpression<boolean> {
    parseValue(value): boolean {
        return JSON.parse(value);
    }

    visit(visitor: OclVisitor): any {
        return visitor.visitLiteralExpression(this);
    }
}
