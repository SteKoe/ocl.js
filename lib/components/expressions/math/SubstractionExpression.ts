import { LeftRightBasedExpression } from '../Expression';
import { OclVisitor } from '../../OclVisitor';

/**
 * Substraction
 *
 * @oclExpression Symbol: -
 * @oclExample 1 - 2
 */
export class SubstractionExpression extends LeftRightBasedExpression {
    visit(visitor: OclVisitor): any {
        return visitor.visitSubstractionExpression(this);
    }
}
