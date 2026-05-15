import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import {SourceBasedExpression} from "../SourceBasedExpression";

/**
 * Returns the largest integer less than or equal to self.
 *
 * @oclSpecification OCL 2.4 - Section 11.2.2 (Real)
 * @oclExpression Number::floor() : Integer
 * @oclExample 3.7.floor() = 3
 * @oclExample (-3.7).floor() = -4
 */
export class FloorExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): number {
        const result = this.getSource().evaluate(visitor, localVariables) as number;

        return Math.floor(result);
    }
}
