import { SourceBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Returns the sum of all elements contained in self if they support the '+' operation.
 *
 * @oclExpression sum() : Number
 * @oclExample self.jobs.salary->sum()
 */
export class SumExpression extends SourceBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitSumExpression(this);
    }
}
