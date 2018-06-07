/**
 * In order to group and organise OCL constraints, packages can be used.
 */
export class PackageDeclaration {
    constructor(type, contexts) {
        this.contexts = contexts;
        this.evaluationResult = true;
    }

    visit(visitor) {
        return visitor.visitPackageDeclaration(this);
    }
}
