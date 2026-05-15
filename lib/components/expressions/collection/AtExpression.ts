import { OclExecutionContext } from '../../OclExecutionContext';
import {BodyBasedExpression} from "../BodyBasedExpression";
import {LocalVariables} from "../../types";

/**
 * Returns the element of the collection at index index.
 *
 * @oclExpression at(index : Number) : T
 * @oclExample self.collection->at(2)
 */
export class AtExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        const source = this.getSource().evaluate(visitor, localVariables);
        const index = this.getBodyAsExpression()?.evaluate(visitor, localVariables) as number;

        if (source instanceof Array && Number.isInteger(index) && index >= 1 && index <= source.length) {
            return source[index - 1];
        }

        return undefined;
    }
}
