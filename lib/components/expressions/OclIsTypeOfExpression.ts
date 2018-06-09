import { BodyBasedExpression } from './Expression';
import { OclVisitor } from '../OclVisitor';

/**
 * Checks if *self* is an instance of exact the class identified by the name
 *
 * @oclExpression oclIsTypeOf(s : String) : Boolean
 */
export class OclIsTypeOfExpression extends BodyBasedExpression {
    visit(visitor: OclVisitor): any {
        return visitor.visitOclIsTypeOfExpression(this);
    }
}
