import { OclExecutionContext } from '../../OclExecutionContext';
import {SourceBasedExpression} from "../SourceBasedExpression";

/**
 * Returns the absolute value of self.
 *
 * @oclExpression Number::abs () : Number
 * @oclExample -2.abs() = 2
 */
export class AbsExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const left = this.getSource().evaluate(visitor, localVariables);

        return Math.abs(left);
    }
}
