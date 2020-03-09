import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Returns the nearest number to self.
 *
 * @oclExpression Number::round () : Number
 * @oclExpression 2.5.round() = 3
 */
export class RoundExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const result = this.getSource().evaluate(visitor, localVariables);

        return Math.round(result);
    }
}
