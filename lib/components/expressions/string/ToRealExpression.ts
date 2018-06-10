import { SourceBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Tries to convert a string to a number.
 *
 * @oclExpression toReal() : Number
 * @oclExample "3.414"->toReal()
 */
export class ToRealExpression extends SourceBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitToRealExpression(this);
    }
}
