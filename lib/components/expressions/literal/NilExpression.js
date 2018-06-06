import { LiteralExpression } from './index'

/**
 */
export class NilExpression extends LiteralExpression {
    parseValue(value) {
        return;
    }

    visit(visitor) {
        return visitor.visitLiteralExpression(this);
    }
}
