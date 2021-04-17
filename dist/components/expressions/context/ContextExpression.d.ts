import { Expression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
export declare abstract class ContextExpression extends Expression {
    protected targetType: string;
    evaluate(visitor: OclExecutionContext): any;
}
