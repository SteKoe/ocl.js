import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Returns the absolute value of self.
 *
 * @oclExpression Number::abs () : Number
 * @oclExample -2.abs() = 2
 */
export class AbsExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        this.getSource().variables = this.variables;
        const left = this.getSource()
            .evaluate(visitor);

        return Math.abs(left);
    }
}
