import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns a string that is concatenated using source and body
 *
 * @oclExpression String::concat (s : String) : String
 * @oclExample self.name.concat("string")
 */
export declare class ConcatExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
