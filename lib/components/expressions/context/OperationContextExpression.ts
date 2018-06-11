import { ContextExpression } from './ContextExpression';
import { OclExecutionContext } from '../../OclExecutionContext';
import { OclValidationError } from '../../OclValidationError';
import { PreExpression } from '../PreExpression';
import { PostExpression } from '../PostExpression';

/**
 *
 */
export class OperationContextExpression extends ContextExpression {
    private fnName: any;
    private returnType: any;
    private preExpressions: Array<PreExpression>;
    private postExpressions: Array<PostExpression>;
    private params: Array<string>;

    constructor(operationMetaInfo, expressions, registeredTypes) {
        super();

        const split = operationMetaInfo.pathName.split('::');
        this.targetType = split[0];
        this.fnName = split[1];
        this.params = operationMetaInfo.params;
        this.returnType = operationMetaInfo.returnType;
        this.preExpressions = expressions.filter(expr => expr instanceof PreExpression);
        this.postExpressions = expressions.filter(expr => expr instanceof PostExpression);

        const actualType = registeredTypes[this.targetType];
        if (actualType && typeof actualType.prototype[this.fnName] === 'function') {
            const self = this;
            const originalFn = actualType.prototype[this.fnName];

            actualType.prototype[this.fnName] = function(...args): any {
                const oclExecutionContext = new OclExecutionContext(this);
                oclExecutionContext.registerTypes(registeredTypes);

                const anies = (self.params || []).reduce((prev, cur, i) => {
                    prev[cur] = args[i];

                    return prev;
                }, {result: undefined});

                self.preExpressions.forEach(preExpression => {
                    preExpression.variables = anies;
                    const evaluationResult = preExpression.evaluate(oclExecutionContext);
                    if (!evaluationResult) {
                        throw new OclValidationError(`A precondition failed on type ${self.targetType}.`);
                    }
                });

                const result = originalFn.call(this, ...args);
                anies.result = result;

                self.postExpressions.forEach(postExpression => {
                    postExpression.variables = anies;
                    const evaluationResult = postExpression.evaluate(oclExecutionContext);
                    if (!evaluationResult) {
                        throw new OclValidationError(`A postcondition failed on type ${self.targetType}.`);
                    }
                });

                return result;
            };
        }
    }
}
