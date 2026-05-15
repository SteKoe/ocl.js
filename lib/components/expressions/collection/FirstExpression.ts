import { OclExecutionContext } from '@/OclExecutionContext';
import {SourceBasedExpression} from "@/expressions/SourceBasedExpression";
import {LocalVariables} from "@/types";

/**
 * Returns the first element of the collection.
 *
 * @oclExpression collection->first() : T
 * @oclExample self.collection->first()
 */
export class FirstExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        const source = this.getSource().evaluate(visitor, localVariables);

        if (source instanceof Array) {
            return source[0];
        }

        return undefined;
    }
}
