import {IteratorExpression} from '../Expression';
import {OclExecutionContext} from '../../OclExecutionContext';

/**
 * @oclSpecification
 * Many times a constraint is needed on all elements of a collection.
 * The forAll operation in OCL allows specifying a Boolean expression, which must hold for all objects in a collection.
 *
 * @oclExpression forAll(expr : oclExpression)
 */
export class ForAllExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext): any {
        const collection = this.getSource()
            .evaluate(visitor);

        if (collection instanceof Array) {
            const iterators = this.getIterators();
            const body = this.getBody();
            body.variables = {};

            if (!iterators || iterators.length === 0) {
                return false;
            } else if (iterators.length === 1) {
                return !collection.some(c => {
                    body.variables[this.getIterators()[0]] = c;
                    const result = body.evaluate(visitor) === false;
                    body.variables[this.getIterators()[0]] = undefined;

                    return result;
                });
            } else if (iterators.length === 2) {
                const sourceLength = collection.length;
                for (let i = 0; i < sourceLength; i++) {
                    body.variables[iterators[0]] = collection[i];
                    for (let j = i + 1; j < sourceLength; j++) {
                        body.variables[iterators[1]] = collection[j];
                        const items = body.evaluate(visitor);

                        body.variables[iterators[1]] = undefined;

                        if (items === false) {
                            body.variables[iterators[0]] = undefined;

                            return false;
                        }
                    }
                    body.variables[iterators[0]] = undefined;
                }

                return true;
            }
        } else {
            return false;
        }
    }
}
