/**
 * In order to group and organise OCL constraints, packages can be used.
 */
import {ContextExpression} from "./ContextExpression";
import {OclVisitor} from "../OclVisitor";

export class PackageDeclaration {
    private contexts: ContextExpression[];

    constructor(type, contexts: ContextExpression[]) {
        this.contexts = contexts;
    }

    getContexts() {
        return this.contexts;
    }

    visit(visitor: OclVisitor) {
        return visitor.visitPackageDeclaration(this);
    }
}
