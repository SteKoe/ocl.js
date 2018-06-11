import { IteratorExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
import { Utils } from '../../Utils';

/**
 * Selects all elements from collection which fit the expr.
 *
 * @oclExpression select(expr : oclExpression) : Collection
 * @oclExample self.collection->select(item | item.name = "random")
 */
export class SelectExpression extends IteratorExpression {
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

                return this.getBody()
                    .evaluate(visitor);
            });
        } else {
            return [];
        }
    }
}
