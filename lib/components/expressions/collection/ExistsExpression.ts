import {OclExecutionContext} from '../../OclExecutionContext';
import {IteratorExpression} from "../IteratorExpression";
import {LocalVariables} from "../../types";

/**
 * Operation which checks whether a collection contains an element specified by expr.
 *
 * @oclExpression exists(expr : OclExpression) : Boolean
 * @oclExample self.collection->exists(i | i < 2)
 */
export class ExistsExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        const collection = this.getSource()
            .evaluate(visitor, localVariables);

        if (collection instanceof Array) {
            return collection.some(c => {
                const result = this.evaluateBodyForItem(visitor, localVariables, c);
                return result === true;
            });
        } else {
            return false;
        }
    }
}
