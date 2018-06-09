import {ContextExpression} from './ContextExpression'
import {OclVisitor} from "../OclVisitor";

/**
 */
export class OperationContextExpression extends ContextExpression {
    private fnName: any;
    private returnType: any;
    private expressions: any;
    private params: any;

    constructor(operationMetaInfo, expressions) {
        super();

        let split = operationMetaInfo.pathName.split('::');
        this.targetType = split[0];
        this.fnName = split[1];
        this.params = operationMetaInfo.params;
        this.returnType = operationMetaInfo.returnType;
        this.expressions = expressions;
    }

    getExpressions() {
        return this.expressions;
    }

    accept(visitor) {
        return true;
    }

    visit(visitor: OclVisitor) {
        visitor.visitOperationContextExpression(this);
    }
}