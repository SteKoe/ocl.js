import { OclExecutionContext } from '../../OclExecutionContext';
import {SourceBasedExpression} from "../SourceBasedExpression";
import { LocalVariables } from '../../types';

/**
 * | A     | NOT A |
 * | ----- | ----- |
 * | true  | false |
 * | false | true  |
 *
 * @oclExample not false
 */
export class NotExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        const source = this.getSource().evaluate(visitor, localVariables);

        return !source;
    }
}
