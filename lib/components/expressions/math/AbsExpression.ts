import { SourceBasedExpression } from '../Expression';
import { OclVisitor } from '../../OclVisitor';

/**
 * Abs
 *
 * @oclExpression Symbol: abs
 */
export class AbsExpression extends SourceBasedExpression {
    visit(visitor: OclVisitor): any {
        return visitor.visitAbsExpression(this);
    }
}
