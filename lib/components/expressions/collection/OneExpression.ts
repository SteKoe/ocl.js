import { IteratorExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

import { SelectExpression } from './SelectExpression';

/**
 * Returns true of there is exactly one element matching the given expression, false otherwise.
 *
 * @oclExpression one(expr : oclExpression) : boolean
 * @oclExample self.collection->one(age < 18)
 */
export class OneExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): boolean {
        const selectExpression = new SelectExpression(this.getSource());
        selectExpression.setBody(this.getBody());
        selectExpression.setIterators(this.getIterators());

        const result = selectExpression.evaluate(visitor, localVariables);

        return result.length === 1;
    }
}
