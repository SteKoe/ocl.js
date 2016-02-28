class Expression {
    constructor() {
        this.type = this.__proto__.constructor.name;
    }

    evaluate(obj) {
        throw new Error('evaluate() function not implemented!')
    }
}

export default Expression
