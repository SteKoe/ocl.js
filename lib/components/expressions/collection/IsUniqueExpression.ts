import {IteratorExpression} from '../Expression';
import {OclExecutionContext} from '../../OclExecutionContext';
import {Utils} from '../../Utils';

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

        if (Array.isArray(collection)) {
            const result = body ? collection.map(c => {
                const variables = {};
                const iterators = this.getIterators();
                if (iterators) {
                    variables[iterators[0]] = c;
                } else {
                    const variableName = Utils.getVariableName(this);
                    if (variableName) {
                        const varName = variableName.getVariable();
                        variables[varName] = varName === "self" ? c : (c[varName] ?? c);
                    }
                }

                return body.evaluate(visitor, {...localVariables, ...variables});
            }) : collection;

            return result.length === new Set(result).size;
        } else {
            return false;
        }
    }
}
