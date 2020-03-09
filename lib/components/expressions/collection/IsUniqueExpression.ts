import { IteratorExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
import { Utils } from '../../Utils';

/**
 * Returns true if the given expr evaluated on the body returns only different values.
 *
 * @oclExpression isUnique(expr : oclExpression) : boolean
 * @oclExample self.collection->isUnique(self > 3)
 */
export class IsUniqueExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const collection = this.getSource()
            .evaluate(visitor);

        const body = this.getBody();
        const iterators = this.getIterators();

        if (collection instanceof Array) {
            const result = collection.map(c => {
                const variables = {};
                if (iterators) {
                    variables[iterators[0]] = c;
                } else {
                    const variableName = Utils.getVariableName(this);
                    variables[variableName.getVariable()] = c;
                }

                return body.evaluate(visitor, {...localVariables, ...variables});
            });

            return result.length === new Set(result).size;
        } else {
            return false;
        }
    }
}
