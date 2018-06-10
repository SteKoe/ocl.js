import * as Expressions from '../expressions';
import { Utils } from '../Utils';
import * as parser from '../../../generator/Parser';

parser.yy = {
    Expression: Expressions,
    Utils
};

export class OclParser {
    static registeredTypes: object;
    static DEBUG: boolean;

    static parse(oclExpression: any, labels: Array<string> = []): Expressions.PackageDeclaration {
        const parsedExpression = parser.parse(oclExpression) as Expressions.PackageDeclaration;

        const unregisteredUsedTypes = parsedExpression.getContexts()
            .map(ctx => {
                ctx.labels = Array.isArray(labels) ? labels : [labels];

                return ctx.targetType;
            })
            .filter(type => OclParser.registeredTypes[type] === undefined);

        return parsedExpression;
    }

    /* tslint:disable:no-console */
    static _lex /* istanbul ignore next */(oclExpression: Expressions.Expression): void {
        const lexer = parser.lexer;
        lexer.setInput(oclExpression);

        while (!lexer.done) {
            const token = lexer.lex();
            let resultingToken;
            /* Look up the token name if necessary */
            if (token in parser.terminals_) {
                resultingToken = parser.terminals_[token];
            }

            console.log(`<${token}, ${lexer.yytext}>`);
        }
    }
    /* tslint:enable:no-console */
}

OclParser.registeredTypes = {
    Object,
    String,
    Number,
    Boolean,
    Function
};
