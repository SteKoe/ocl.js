import { LiteralExpression } from './index';
import { IOclVisitor } from '../../IOclVisitor';

export class NilExpression extends LiteralExpression<void> {
    constructor() {
        super(undefined);
    }

    parseValue(value): void {
        return undefined;
    }

    visit(visitor: IOclVisitor): any {
        return visitor.visitLiteralExpression(this);
    }
}
