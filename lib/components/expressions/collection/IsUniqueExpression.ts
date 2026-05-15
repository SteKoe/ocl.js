import {OclExecutionContext} from '@/OclExecutionContext';
import {IteratorExpression} from "@/expressions/IteratorExpression";
import {LocalVariables} from "@/types";

/**
 * Returns true if the given expr evaluated on the body returns only different values.
 *
 * @oclExpression isUnique(expr : oclExpression) : boolean
 * @oclExample self.collection->isUnique(self > 3)
 */
export class IsUniqueExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        const collection = this.getSource()
            .evaluate(visitor, localVariables);

        const body = this.getBody();

        if (collection instanceof Array) {
            let result = collection;
            if (body) {
                result = collection.map(c => this.evaluateBodyForItem(visitor, localVariables, c));
            }

            return result.length === new Set(result).size;
        } else {
            return false;
        }
    }
}
