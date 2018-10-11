import {ContextExpression} from './context/ContextExpression';
import {OclExecutionContext} from '../OclExecutionContext';
import {Utils} from '../Utils';
import {Expression} from './Expression';

/**
 * In order to group and organise OCL constraints, packages can be used.
 */
export class PackageDeclaration extends Expression {
    private contexts: Array<ContextExpression>;
    private labels: Array<string>;
    private oclExpression: string;

    constructor(type, contexts: Array<ContextExpression>) {
        super();
        this.contexts = contexts;
    }

    accept(visitor: OclExecutionContext): boolean {
        const labelsToExecute = visitor.getLabelsToExecute();
        if (labelsToExecute.length === 0 || this.labels.length === 0) {
            return true;
        }

        const anies = Utils.intersect(this.labels, labelsToExecute);

        return anies.length > 0;
    }

    getContexts(): Array<ContextExpression> {
        return this.contexts;
    }

    setExecutionLabels(labels: Array<string>): any {
        this.labels = labels;
    }

    setRawOclExpression(oclExpression: string): void {
        this.oclExpression = oclExpression;
    }

    getRawOclExpression(): string {
        return this.oclExpression;
    }

    evaluate(visitor: OclExecutionContext): any {
        if (this.accept(visitor)) {
            const contextsToVisit = this.getContexts()
                .filter(ctx => ctx.accept(visitor));

            const evaluationResult = !contextsToVisit
                .map(ctx => ctx.evaluate(visitor))
                .some(inv => inv === false);

            visitor.setEvaluationResult(evaluationResult);
        }

        return this;
    }

}
