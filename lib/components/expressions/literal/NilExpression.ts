import { LiteralExpression } from './index';
import { IOclVisitor } from '../../IOclVisitor';

export class NilExpression extends LiteralExpression<void> {
    constructor() {
        super(undefined);
    }

    parseValue(): void {
        return;
    }

    visit(visitor: IOclVisitor): any {
        return visitor.visitLiteralExpression(this);
    }
}
