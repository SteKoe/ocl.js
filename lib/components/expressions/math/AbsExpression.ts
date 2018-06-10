import { SourceBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Abs
 *
 * @oclExpression Symbol: abs
 */
export class AbsExpression extends SourceBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitAbsExpression(this);
    }
}
