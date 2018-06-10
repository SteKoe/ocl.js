import { SourceBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Tries to convert a string to a number.
 *
 * @oclExpression toInteger() : Number
 * @oclExample "3.414"->toInteger()
 */
export class ToIntegerExpression extends SourceBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitToIntegerExpression(this);
    }
}
