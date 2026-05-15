import { OclExecutionContext } from '../../OclExecutionContext';
import {SourceBasedExpression} from "../SourceBasedExpression";
import {LocalVariables} from "../../types";

/**
 * Returns the size of the given collection.
 *
 * @oclExpression size() : Number
 * @oclExample self.collection->size()
 */
export class SizeExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): number {
        const source = this.getSource().evaluate(visitor, localVariables);

        if (source && (source instanceof Array || typeof source === 'string')) {
            return source.length;
        } else {
            return 0;
        }
    }
}
