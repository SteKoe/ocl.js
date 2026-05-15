import { OclExecutionContext } from '../../OclExecutionContext';
import { LocalVariables } from '../../types';
import {SourceBasedExpression} from "../SourceBasedExpression";

/**
 * Returns the nearest number to self.
 *
 * @oclExpression Number::round () : Number
 * @oclExpression 2.5.round() = 3
 */
export class RoundExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        const result = this.getSource().evaluate(visitor, localVariables) as number;

        return Math.round(result);
    }
}
