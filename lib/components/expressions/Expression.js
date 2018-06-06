export class Expression {
    constructor() {
        this.type = this.constructor.name;
    }

    accept(obj) {
        return true;
    }

    visit(visitor) {
        throw new Error(`Visitor for '${this.type}' not yet implemented!`);
    }
}
