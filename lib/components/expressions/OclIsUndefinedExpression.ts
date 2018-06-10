import { SourceBasedExpression } from './Expression';
import { IOclVisitor } from '../IOclVisitor';

/**
 * Checks if *self* is not defined
 *
 * @oclExpression oclIsUndefined() : Boolean
 */
export class OclIsUndefinedExpression extends SourceBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitOclIsUndefinedExpression(this);
    }
}
