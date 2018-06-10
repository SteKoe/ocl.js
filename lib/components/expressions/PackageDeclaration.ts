import { ContextExpression } from './context/ContextExpression';
import { IOclVisitor } from '../IOclVisitor';
import { Utils } from '../Utils';

/**
 * In order to group and organise OCL constraints, packages can be used.
 */
export class PackageDeclaration {
    private contexts: Array<ContextExpression>;
    private labels: Array<string>;

    constructor(type, contexts: Array<ContextExpression>) {
        this.contexts = contexts;
    }

    accept(visitor: IOclVisitor): boolean {
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

    visit(visitor: IOclVisitor): any {
        return visitor.visitPackageDeclaration(this);
    }

    setExecutionLabels(labels: Array<string>): any {
        this.labels = labels;
    }
}
