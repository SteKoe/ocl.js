import { IteratorExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * @oclSpecification
 * Many times a constraint is needed on all elements of a collection.
 * The forAll operation in OCL allows specifying a Boolean expression, which must hold for all objects in a collection.
 *
 * @oclExpression forAll(expr : oclExpression)
 */
export declare class ForAllExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext): any;
}
