import { IteratorExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
import { Utils } from '../../Utils';

/**
 * Operation which checks whether a collection contains an element specified by expr.
 *
 * @oclExpression exists(expr : OclExpression) : Boolean
 * @oclExample self.collection->exists(i | i < 2)
 */
export class ExistsExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const collection = this.getSource()
            .evaluate(visitor, localVariables);

        if (collection instanceof Array) {
            return collection.some(c => {
                const variables = {};
                if (this.getIterators()) {
                    variables[this.getIterators()[0]] = c;
                } else {
                    const variableName = Utils.getVariableName(this);
                    variables[variableName.getVariable()] = c[variableName.getVariable()];
                }

                const visitResult = this.getBody().evaluate(visitor, {...localVariables, ...variables});

                return visitResult === true;
            });
        } else {
            return false;
        }
    }
}
