const parser = require('./parser');

export class OclParser {
    static parse(oclExpression) {
        return parser.parse(oclExpression);
    }
}