import { IteratorExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
import { Utils } from '../../Utils';

/**
 * @oclSpecification
 * When we want to specify a collection that is derived from some other collection, but which contains different
 * objects from the original collection (i.e., it is not a sub-collection), we can use a collect operation.
 * The collect operation uses the same syntax as the select and reject.
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
