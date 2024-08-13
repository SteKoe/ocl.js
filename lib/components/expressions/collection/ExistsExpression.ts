import {IteratorExpression} from '../Expression';
import {OclExecutionContext} from '../../OclExecutionContext';
import {Utils} from '../../Utils';

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
                const iterators = this.getIterators();
                if (iterators) {
                    variables[iterators[0]] = c;
                } else {
                    const variableName = Utils.getVariableName(this);
                    const varName = variableName.getVariable();
                    variables[varName] = varName === "self" ? c : c[varName];
                }

                return this.getBody().evaluate(visitor, {...localVariables, ...variables}) === true;
            });
        } else {
            return false;
        }
    }
}
