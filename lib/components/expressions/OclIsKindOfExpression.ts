import { BodyBasedExpression } from './Expression';
import { IOclVisitor } from '../IOclVisitor';

/**
 * Checks if *self* is an instance of the class identified by the name
 *
 * @oclExpression oclIsKindOf(type : T) : Boolean
 */
export class OclIsKindOfExpression extends BodyBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitOclIsKindOfExpression(this);
    }
}
