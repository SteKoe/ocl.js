import { OclExecutionContext } from '../../OclExecutionContext';
import {SourceBasedExpression} from "../SourceBasedExpression";

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
