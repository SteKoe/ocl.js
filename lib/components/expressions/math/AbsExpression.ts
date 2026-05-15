import { OclExecutionContext } from '../../OclExecutionContext';
import { LocalVariables } from '../../types';
import {SourceBasedExpression} from "../SourceBasedExpression";

/**
 * Returns the absolute value of self.
 *
 * @oclExpression Number::abs () : Number
 * @oclExample -2.abs() = 2
 */
export class AbsExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        const left = this.getSource().evaluate(visitor, localVariables) as number;

        return Math.abs(left);
    }
}
