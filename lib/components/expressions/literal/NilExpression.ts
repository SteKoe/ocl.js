import { LiteralExpression } from './index';
import { OclVisitor } from '../../OclVisitor';

export class NilExpression extends LiteralExpression<void> {
    constructor() {
        super(undefined);
    }

    parseValue(): void {
        return;
    }

    visit(visitor: OclVisitor): any {
        return visitor.visitLiteralExpression(this);
    }
}
