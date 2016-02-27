class Expression {
    constructor() {
        this.name = this.__proto__.constructor.name;
    }

    evaluate(obj) {
        throw new Error('evaluate() function not implemented!')
    }
}

export default Expression
