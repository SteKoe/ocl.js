var parser = require('./parser');

export default class OclParser {
    constructor(oclExpression) {
        this.oclExpression = oclExpression;
    }

    parse() {
        return parser.parse(this.oclExpression);
    }
}