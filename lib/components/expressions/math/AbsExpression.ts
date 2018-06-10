import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Abs
 *
 * @oclExpression Symbol: abs
 */
export class AbsExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        this.getSource().variables = this.variables;
        const left = this.getSource()
            .evaluate(visitor);

        return Math.abs(left);
    }
}
