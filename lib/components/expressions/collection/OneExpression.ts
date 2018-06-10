import { IteratorExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Returns true of there is exactly one element matching the given expression, false otherwise.
 *
 * @oclExpression one(expr : oclExpression) : boolean
 */
export class OneExpression extends IteratorExpression {
    visit(visitor: IOclVisitor): boolean {
        return visitor.visitOneExpression(this);
    }
}
