import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns a string containing all characters from self starting from index *start* up to index *end* included.
 * Both *start* and *end* parameters should be contained between *1* and *self.size()* included.
 * *start* cannot be greater than *end*.
 *
 * @oclExpression String::substring (start : Number, end : Number) : String
 * @oclExample self.name.substring(0,2)
 */
export declare class SubstringExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): string;
}
