import { ContextExpression } from './ContextExpression';
import { OclVisitor } from '../OclVisitor';

/**
 * In order to group and organise OCL constraints, packages can be used.
 */
export class PackageDeclaration {
    private contexts: Array<ContextExpression>;

    constructor(type, contexts: Array<ContextExpression>) {
        this.contexts = contexts;
    }

    getContexts(): Array<ContextExpression> {
        return this.contexts;
    }

    visit(visitor: OclVisitor): any {
        return visitor.visitPackageDeclaration(this);
    }
}
