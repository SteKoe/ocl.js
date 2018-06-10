import { IteratorExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
import { Utils } from '../../Utils';

/**
 * Returns a collection with all elements except for those who the given oclExpression validates to true.
 *
 * @oclExpression reject(expr : oclExpression) : Collection
 * @oclExample self.customer->reject(underage)
 */
export class RejectExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext): any {
        const collection = this.getSource()
            .evaluate(visitor);

        if (collection instanceof Array) {
            return collection.filter(c => {
                this.getBody().variables = {};
                if (this.getIterators()) {
                    this.getBody().variables[this.getIterators()[0]] = c;
                } else {
                    const variableName = Utils.getVariableName(this);
                    this.getBody().variables[variableName.getVariable()] = c;
                }

                const visitResult = this.getBody()
                    .evaluate(visitor);

                return !visitResult;
            });
        } else {
            return [];
        }
    }
}
