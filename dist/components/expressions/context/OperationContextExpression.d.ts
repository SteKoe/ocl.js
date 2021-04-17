import { ContextExpression } from './ContextExpression';
/**
 * The Operation Context Expression allows to define pre and or post conditions of functions.
 *
 * @oclExpression context Person::kill() (pre|post)
 * @oclExample
 *     context Person::setAge(age: number)
 *         pre: age > 0
 */
export declare class OperationContextExpression extends ContextExpression {
    private readonly fnName;
    private returnType;
    private preExpressions;
    private postExpressions;
    private params;
    constructor(operationMetaInfo: any, expressions: any, registeredTypes: any);
}
