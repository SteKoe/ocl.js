import {OclExecutionContext} from '../../OclExecutionContext';
import {IteratorExpression} from "../IteratorExpression";

/**
 * Returns true if the given expr evaluated on the body returns only different values.
 *
 * @oclExpression isUnique(expr : oclExpression) : boolean
 * @oclExample self.collection->isUnique(self > 3)
 */
export class IsUniqueExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const collection = this.getSource()
            .evaluate(visitor, localVariables);

        const body = this.getBody();

        if (collection instanceof Array) {
            let result = collection;
            if (body) {
                result = collection.map(c => this.evaluateBody(visitor, localVariables, c));
            }

            return result.length === new Set(result).size;
        } else {
            return false;
        }
    }
}
