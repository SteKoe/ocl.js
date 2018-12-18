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
    evaluate(visitor: OclExecutionContext): any {
        const collection = this.getSource()
            .evaluate(visitor);

        if (collection instanceof Array) {
            const result = collection.map(c => {
                const body = this.getBody();
                body.variables = {};
                if (this.getIterators()) {
                    body.variables[this.getIterators()[0]] = c;
                } else {
                    const variableName = Utils.getVariableName(this);
                    body.variables[variableName.getVariable()] = c;
                }

                return body.evaluate(visitor);
            });

            return result.length === new Set(result).size;
        } else {
            return false;
        }
    }
}
