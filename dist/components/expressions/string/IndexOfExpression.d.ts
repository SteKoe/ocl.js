import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns the index of the given string in self or 0 if it is not condained.
 *
 * @oclExpression String::indexOf (s : String) : Number
 * @oclExample self.name.indexOf("string")
 */
export declare class IndexOfExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
