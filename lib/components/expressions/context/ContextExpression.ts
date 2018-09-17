import {Expression} from '../Expression';
import {OclExecutionContext} from '../../OclExecutionContext';

export abstract class ContextExpression extends Expression {
    protected targetType: string;

    evaluate(visitor: OclExecutionContext): any {
        if (this.accept(visitor)) {
            visitor.addEvaluatedContext(this);
        }
    }
}
