import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import {SourceBasedExpression} from "../SourceBasedExpression";

/**
 * Returns the smallest integer greater than or equal to self.
 *
 * @oclSpecification OCL 2.4 - Section 11.2.2 (Real)
 * @oclExpression Number::ceil() : Integer
 * @oclExample 3.2.ceil() = 4
 * @oclExample (-3.2).ceil() = -3
 */
export class CeilExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): number {
        const result = this.getSource().evaluate(visitor, localVariables) as number;

        return Math.ceil(result);
    }
}
