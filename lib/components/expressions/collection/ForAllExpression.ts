import { IteratorExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * @oclSpecification
 * Many times a constraint is needed on all elements of a collection.
 * The forAll operation in OCL allows specifying a Boolean expression, which must hold for all objects in a collection.
 *
 * @oclExpression forAll(expr : oclExpression)
 */
export class ForAllExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const collection = this.getSource()
            .evaluate(visitor);

        if (collection instanceof Array) {
            const iterators = this.getIterators();
            const body = this.getBody();

            if (!iterators || iterators.length === 0) {
                return !collection.some(c => {
                    return body.evaluate(visitor, c) === false;
                });
            } else if (iterators.length === 1) {
                return !collection.some(c => {
                    return body.evaluate(visitor, {[this.getIterators()[0]]: c}) === false;
                });
            } else if (iterators.length === 2) {
                const sourceLength = collection.length;
                for (let i = 0; i < sourceLength; i++) {
                    const variables = {};
                    variables[iterators[0]] = collection[i];
                    for (let j = i + 1; j < sourceLength; j++) {
                        variables[iterators[1]] = collection[j];
                        const items = body.evaluate(visitor, {...localVariables, ...variables});
                        if (items === false) {
                            return false;
                        }
                    }
                }

                return true;
            }
        } else {
            return false;
        }
    }
}
