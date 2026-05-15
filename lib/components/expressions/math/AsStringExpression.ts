import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import {SourceBasedExpression} from "../SourceBasedExpression";

/**
 * Converts a number to its string representation.
 *
 * NOTE: This operation is named asString() instead of toString() to avoid
 * conflicts with JavaScript's Object.prototype.toString.
 *
 * @oclSpecification OCL 2.4 - Section 11.2.1 (Integer) and 11.2.2 (Real) 
 * Note: OCL spec uses toString(), but this implementation uses asString()
 * @oclExpression Number::asString() : String
 * @oclExample 42.asString() = '42'
 * @oclExample 3.14.asString() = '3.14'
 * @oclExample (-5).asString() = '-5'
 */
export class AsStringExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): string {
        const result = this.getSource().evaluate(visitor, localVariables);

        return String(result);
    }
}
