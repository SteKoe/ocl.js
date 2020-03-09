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
export class NotExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const source = this.getSource().evaluate(visitor, localVariables);

        return !source;
    }
}
