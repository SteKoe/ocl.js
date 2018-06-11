import { IteratorExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
import { Utils } from '../../Utils';

/**
 * Returns a collection having the same size as the original one.
 * The given oclExpression is applied on all elements of the collection.
 *
 * @oclExpression collect(expr : OclExpression) : Collection
 * @oclExample self.children->collect(age)
 */
export class CollectExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext): any {
        const collection = this.getSource()
            .evaluate(visitor);

        if (collection instanceof Array) {
            return collection.map(c => {
                this.getBody().variables = {};
                if (this.getIterators()) {
                    this.getBody().variables[this.getIterators()[0]] = c;
                } else {
                    const variableName = Utils.getVariableName(this);
                    this.getBody().variables[variableName.getSource().evaluate(visitor)] = c;
                }

                return this.getBody()
                    .evaluate(visitor);
            });
        } else {
            return collection;
        }
    }
}
