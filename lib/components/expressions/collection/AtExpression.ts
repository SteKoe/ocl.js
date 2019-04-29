import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Returns the element of the collection at index index.
 *
 * @oclExpression at(index : Number) : T
 * @oclExample self.collection->at(2)
 */
export class AtExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const source = this.getSource().evaluate(visitor, localVariables);
        const index = this.getBody().evaluate(visitor, localVariables);

        if (source instanceof Array && Number.isInteger(index) && index >= 1 && index < source.length) {
            return source[index - 1];
        }
    }
}
