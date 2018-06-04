export class PackageDeclaration {
    constructor(type, contexts) {
        this.contexts = contexts;
        this.evaluationResult = true;
    }

    evaluate(obj) {
        obj = obj || {};

        for (let i = 0, length = this.contexts.length; i < length && this.evaluationResult === true; i++) {
            this.evaluationResult = this.contexts[i].evaluate(obj);
        }

        return this.evaluationResult;
    }
}
