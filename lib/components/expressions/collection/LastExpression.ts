import { OclExecutionContext } from '../../OclExecutionContext';
import {SourceBasedExpression} from "../SourceBasedExpression";
import {LocalVariables} from "../../types";

/**
 * Returns the last element of the collection.
 *
 * @oclExpression last() : T
 * @oclExample self.collection->last()
 */
export class LastExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        const source = this.getSource().evaluate(visitor, localVariables);

        if (source instanceof Array) {
            return source[source.length - 1];
        }

        return undefined;
    }
}
