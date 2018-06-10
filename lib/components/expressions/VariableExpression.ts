import { SourceBasedExpression } from './Expression';
import { IOclVisitor } from '../IOclVisitor';

/**
 */
export class VariableExpression extends SourceBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitVariableExpression(this);
    }
}
