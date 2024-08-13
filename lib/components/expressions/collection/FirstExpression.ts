import { OclExecutionContext } from '../../OclExecutionContext';
import {SourceBasedExpression} from "../SourceBasedExpression";

/**
 * Returns the first element of the collection.
 *
 * @oclExpression collection->first() : T
 * @oclExample self.collection->first()
 */
export class FirstExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const source = this.getSource().evaluate(visitor, localVariables);

        if (source instanceof Array) {
            return source[0];
        }
    }
}
