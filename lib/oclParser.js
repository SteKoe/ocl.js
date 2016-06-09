var parser = require('./parser');

export default class OclParser {
    static parse(oclExpression) {
        return parser.parse(oclExpression);
    }
}