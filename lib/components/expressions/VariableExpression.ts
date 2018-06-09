import { SourceBasedExpression } from './Expression';
import { OclVisitor } from '../OclVisitor';

/**
 */
export class VariableExpression extends SourceBasedExpression {
    visit(visitor: OclVisitor): any {
        return visitor.visitVariableExpression(this);
    }
}
