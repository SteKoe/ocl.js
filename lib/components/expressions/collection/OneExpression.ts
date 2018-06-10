import { IteratorExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
import { SelectExpression } from './SelectExpression';

/**
 * Returns true of there is exactly one element matching the given expression, false otherwise.
 *
 * @oclExpression one(expr : oclExpression) : boolean
 */
export class OneExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext): boolean {
        const selectExpression = new SelectExpression(this.getSource());
        selectExpression.setBody(this.getBody());
        selectExpression.setIterators(this.getIterators());
        selectExpression.variables = this.variables;

        const result = selectExpression.evaluate(visitor);

        return result.length === 1;
    }
}
