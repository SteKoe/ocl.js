import { ContextExpression } from './ContextExpression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 *
 */
export class OperationContextExpression extends ContextExpression {
    private fnName: any;
    private returnType: any;
    private expressions: any;
    private params: any;

    constructor(operationMetaInfo, expressions) {
        super();

        const split = operationMetaInfo.pathName.split('::');
        this.targetType = split[0];
        this.fnName = split[1];
        this.params = operationMetaInfo.params;
        this.returnType = operationMetaInfo.returnType;
        this.expressions = expressions;
    }

    getExpressions(): any {
        return this.expressions;
    }

    accept(visitor: OclExecutionContext): boolean {
        return true;
    }

    evaluate(visitor: OclExecutionContext): any {
        super.evaluate(visitor);

        if (this.accept(visitor)) {
            this.getExpressions()
                .forEach(expression => {
                    expression.visit(visitor);
                });
        }
    }
}
