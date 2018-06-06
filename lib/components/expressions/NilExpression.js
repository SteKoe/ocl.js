import { LiteralExpression } from './literal'

export class NilExpression extends LiteralExpression {
    parseValue(value) {
        return;
    }

    visit(visitor) {
        return visitor.visitLiteralExpression(this);
    }
}
