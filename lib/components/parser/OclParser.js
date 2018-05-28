const parser = require('./Parser');

export class OclParser {
    static parse(oclExpression) {
        return parser.parse(oclExpression);
    }
}