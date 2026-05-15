import { Expression } from '@/expressions/Expression';
import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';

export abstract class ContextExpression extends Expression {
    protected targetType!: string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): any {
        if (this.accept(visitor)) {
            visitor.addEvaluatedContext(this);
        }
    }
}
