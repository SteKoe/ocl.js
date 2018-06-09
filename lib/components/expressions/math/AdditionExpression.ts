import { LeftRightBasedExpression } from '../Expression';
import { OclVisitor } from '../../OclVisitor';

/**
 * Addition
 *
 * @oclExpression Symbol: +
 * @oclExample 1 + 2
 */
export class AdditionExpression extends LeftRightBasedExpression {
    visit(visitor: OclVisitor): any {
        return visitor.visitAdditionExpression(this);
    }
}
