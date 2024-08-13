import { OclExecutionContext } from '../../OclExecutionContext';
import {SourceBasedExpression} from "../SourceBasedExpression";

/**
 * Returns the last element of the collection.
 *
 * @oclExpression last() : T
 * @oclExample self.collection->last()
 */
export class LastExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const source = this.getSource().evaluate(visitor, localVariables);

        if (source instanceof Array) {
            return source[source.length - 1];
        }
    }
}
