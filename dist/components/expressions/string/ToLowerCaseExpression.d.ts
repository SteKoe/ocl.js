import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns *self* as lower case string.
 *
 * @oclExpression String:: toLowerCase () : String
 * @oclExample self.name.toLowerCase()
 */
export declare class ToLowerCaseExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
