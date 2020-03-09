import { IteratorExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
import { Utils } from '../../Utils';

/**
 * Returns the first element that validates the given expression.
 *
 * @oclExpression any(expr : OclExpression) : T
 * @oclExample self.collection->any(i < 2)
 */
export class AnyExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const collection = this.getSource()
            .evaluate(visitor);

        if (collection instanceof Array) {
            return collection.find(c => {
                const variables = {};
                if (this.getIterators()) {
                    variables[this.getIterators()[0]] = c;
                } else {
                    const variableName = Utils.getVariableName(this);
                    variables[variableName.getVariable()] = c[variableName.getVariable()] || c;
                }

                return this.getBody().evaluate(visitor, {...localVariables, ...variables});
            });
        }

        return;
    }
}
