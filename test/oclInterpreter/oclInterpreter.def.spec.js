import {expect} from "chai";

import {OclParser} from "../../lib/components/parser/OclParser";
require('../../generator/oclParserGenerator');

describe('OCLInterpreter', () => {
    describe('let', () => {
        it('should set simple string variable', () => {
            const oclExpression = `
            context Object
                def: variable = "test"
                inv: self.variable = "test"
        `;
            const oclRule = OclParser.parse(oclExpression);

            var a = {};
            let actual = oclRule.evaluate(a);
            expect(actual).to.be.true;
        });

        it('should assign ->size() call', () => {
            const oclExpression = `
            context Object
                def: childCount = self.children->size()
                inv: self.childCount = 2
        `;
            const oclRule = OclParser.parse(oclExpression);

            var mother = {
                children: [1, 2]
            };
            let actual = oclRule.evaluate(mother);
            expect(actual).to.be.true;
        });

        it('should process union', () => {
            const oclExpression = `
            context Object
                def: concat = self.a->union(self.b)
                inv: self.concat->size() = 4
        `;
            const oclRule = OclParser.parse(oclExpression);
            var o = {
                a: [1, 2],
                b: [3, 4]
            };
            let actual = oclRule.evaluate(o);
            expect(actual).to.be.true;
        });

        it('should set simple string variable with data type', () => {
            const oclExpression = `
            context Object
                def: variable : String = "test"
                inv: self.variable = "test"
        `;
            const oclRule = OclParser.parse(oclExpression);

            var a = {};
            let actual = oclRule.evaluate(a);
            expect(actual).to.be.true;
        });
    });
});

