import { LeftRightBasedExpression } from '../LeftRightBasedExpression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * | A     | B     | A xor B |
 * | ----- | ----- | ------- |
 * | false | false | false   |
 * | false | true  | true    |
 * | true  | false | true    |
 * | true  | true  | false   |
 *
 * @oclExample false xor true
 */
export declare class XorExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
