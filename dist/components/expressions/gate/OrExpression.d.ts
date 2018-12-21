import { LeftRightBasedExpression } from '../LeftRightBasedExpression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * =====    =====   ===========
 * A        B       A or B
 * =====    =====   ===========
 * false    false   false
 * false    true    true
 * true     false   true
 * true     true    true
 * =====    =====   ===========
 *
 * @oclExample false or true
 */
export declare class OrExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
