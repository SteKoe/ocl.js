import * as Expressions from '../expressions';
import { Utils } from '../Utils';
import * as parser from '../../../generator/Parser';

parser.yy = {
    Expression: Expressions,
    Utils
};

export class OclParser {
    static registeredTypes: any = {
        Array,
        Boolean,
        Function,
        Number,
        Object,
        String
    };

    static registeredEnums: any = {};

    static parseQuery(oclExpression: any, registeredTypes?: any): Expressions.Expression {
        parser.yy.registeredTypes = registeredTypes || {};

        return parser.parse(oclExpression) as Expressions.Expression;
    }

    static parse(oclExpression: any, labels: Array<string> = [], registeredTypes?: any): Expressions.PackageDeclaration {
        const packageDeclaration = OclParser.parseQuery(oclExpression, registeredTypes) as Expressions.PackageDeclaration;
        packageDeclaration.setExecutionLabels(labels);
        packageDeclaration.setRawOclExpression(oclExpression);

        return packageDeclaration;
    }
}
