import * as Expressions from '@/expressions';
import { TypeRegistry, EnumRegistry } from '@/types';
import { OclRecursiveDescentParser } from './OclRecursiveDescentParser';

const parser = new OclRecursiveDescentParser();

export class OclParser {
    static registeredTypes: TypeRegistry = {
        Array,
        Boolean,
        Function,
        Number,
        Object,
        String
    };

    static registeredEnums: EnumRegistry = {};

    static parseQuery(oclExpression: string, registeredTypes?: TypeRegistry): Expressions.Expression {
        return parser.parse(oclExpression, registeredTypes ?? {}) as Expressions.Expression;
    }

    static parse(oclExpression: string, labels: Array<string> = [], registeredTypes?: TypeRegistry): Expressions.PackageDeclaration {
        const packageDeclaration = OclParser.parseQuery(oclExpression, registeredTypes) as Expressions.PackageDeclaration;
        packageDeclaration.setExecutionLabels(labels);
        packageDeclaration.setRawOclExpression(oclExpression);

        return packageDeclaration;
    }
}
