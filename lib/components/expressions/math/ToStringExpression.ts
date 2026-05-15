import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import {SourceBasedExpression} from "../SourceBasedExpression";

/**
 * Converts a number to its string representation.
 *
 * @oclSpecification OCL 2.4 - Section 11.2.1 (Integer) and 11.2.2 (Real)
 * @oclExpression Number::toString() : String
 * @oclExample 42.toString() = '42'
 * @oclExample 3.14.toString() = '3.14'
 * @oclExample (-5).toString() = '-5'
 */
export class ToStringExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): string {
        const result = this.getSource().evaluate(visitor, localVariables);

        return String(result);
    }
}
