import { OclExecutionContext } from '../../OclExecutionContext';
import {SourceBasedExpression} from "../SourceBasedExpression";

/**
 * Returns true if self is empty, false otherwise.
 *
 * @oclExpression isEmpty() : Boolean
 * @oclExample self.cars->isEmpty()
 */
export class IsEmptyExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const source = this.getSource()
            .evaluate(visitor, localVariables);

        return Array.isArray(source) ? source.length === 0 : true;
    }
}
