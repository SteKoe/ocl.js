import { BodyBasedExpression } from './Expression';
import { IOclVisitor } from '../IOclVisitor';

/**
 * Checks if *self* is an instance of exact the class identified by the name
 *
 * @oclExpression oclIsTypeOf(s : String) : Boolean
 */
export class OclIsTypeOfExpression extends BodyBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitOclIsTypeOfExpression(this);
    }
}
