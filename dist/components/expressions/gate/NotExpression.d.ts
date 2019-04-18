import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * | A     | NOT A |
 * | ----- | ----- |
 * | true  | false |
 * | false | true  |
 *
 * @oclExample not false
 */
export declare class NotExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
