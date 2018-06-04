const parser = require('./Parser');

export class OclParser {
    static parse(oclExpression) {
        return parser.parse(oclExpression);
    }

    static _lex(oclExpression) {
        const lexer = parser.lexer;
        lexer.setInput(oclExpression);

        while (!lexer.done) {
            let token = lexer.lex();
            let resultingToken;
            /* Look up the token name if necessary */
            if (token in parser.terminals_) {
                resultingToken = parser.terminals_[token];
            }

            console.log('<' + token + ', ' + lexer.yytext + '>')
        }
    }
}