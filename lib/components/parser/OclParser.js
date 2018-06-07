const parser = require('./Parser');

export class OclParser {
    static parse(oclExpression) {
        let parsedExpression = parser.parse(oclExpression)

        let unregisteredUsedTypes = parsedExpression.contexts
            .map(ctx => ctx.targetType)
            .filter(type => OclParser.registeredTypes[type] === undefined)

        if (unregisteredUsedTypes.length !== 0 && OclParser.DEBUG === true) {
            const unusedTypeWarning = [
                'The following types are addressed by context expressions, but not registered as type in engine. ',
                'Hence, expressions that rely on instanceof may not work as expected.',
                '',
                unregisteredUsedTypes.join(', ')
            ]
            console.info(unusedTypeWarning.join('\n'))
        }

        return parsedExpression;
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

            // DO NOT REMOVE THIS. IS USED FOR DEBUG ONLY!
            console.log('<' + token + ', ' + lexer.yytext + '>')
        }
    }
}
OclParser.DEBUG = false;

OclParser.registeredTypes = {
    "Object": Object,
    "String": String,
    "Number": Number,
    "Boolean": Boolean,
    "Function": Function
};