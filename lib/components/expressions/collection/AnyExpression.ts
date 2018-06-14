import { IteratorExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
import { Utils } from '../../Utils';

/**
 * Return the first element that matches the given OclExpression.
 *
 * @oclExpression any(expr : OclExpression) : T
 * @oclExample self.collection->any(i < 2)
 */
export class AnyExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext): any {
        const collection = this.getSource()
            .evaluate(visitor);

        if (collection instanceof Array) {
            return collection.find(c => {
                this.getBody().variables = {};
                if (this.getIterators()) {
                    this.getBody().variables[this.getIterators()[0]] = c;
                } else {
                    const variableName = Utils.getVariableName(this);
                    this.getBody().variables[variableName.getVariable()] = c[variableName.getVariable()] || c;
                }

                return this.getBody()
                    .evaluate(visitor);
            });
        }

        return;
    }
}
