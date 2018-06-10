import { Expression } from '../Expression';

export abstract class ContextExpression extends Expression {
    protected targetType: string;
}
