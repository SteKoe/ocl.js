import * as Expressions from "../expressions";
import {Expression, PackageDeclaration} from "../expressions";
import {Utils} from "../Utils";

const parser = require("../../../generator/Parser");
parser.yy = {
    Expression: Expressions,
    Utils: Utils
};

export class OclParser {
    static registeredTypes: object;
    static DEBUG: boolean;

    static parse(oclExpression: any, labels: string[] = []) {
        let parsedExpression = <PackageDeclaration>parser.parse(oclExpression);

        let unregisteredUsedTypes = parsedExpression.getContexts()
            .map(ctx => {
                ctx.labels = Array.isArray(labels) ? labels : [labels];
                return ctx.targetType;
            })
            .filter(type => OclParser.registeredTypes[type] === undefined);

        if (unregisteredUsedTypes.length !== 0 && OclParser.DEBUG === true) {
            const unusedTypeWarning = [
                'The following types are addressed by context expressions, but not registered as type in engine. ',
                'Hence, expressions that rely on instanceof may not work as expected.',
                '',
                unregisteredUsedTypes.join(', ')
            ];
            console.info(unusedTypeWarning.join('\n'))
        }

        return parsedExpression;
    }

    static _lex /* istanbul ignore next */(oclExpression: Expression) {
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