import {OclParser} from "../../lib/components/parser/oclParser";

const should = require('should');

require('../../generator/oclParserGenerator');

describe('OCLInterpreter', () => {
    describe('let', () => {
        it('should set simple string variable', () => {
            const oclExpression = `
            context Object
                def: let variable: "test"
                inv: self.variable = "test"
        `;
            const oclRule = OclParser.parse(oclExpression);

            var a = {};
            let actual = oclRule.evaluate(a);
            actual.should.be.ok();
        });

        it('should set simple string variable without let', () => {
            const oclExpression = `
            context Object
                def: variable: "test"
                inv: self.variable = "test"
        `;
            const oclRule = OclParser.parse(oclExpression);

            var a = {};
            let actual = oclRule.evaluate(a);
            actual.should.be.ok();
        });

        it('should assign ->size() call', () => {
            const oclExpression = `
            context Object
                def: let childCount: self.children->size()
                inv: self.childCount = 2
        `;
            const oclRule = OclParser.parse(oclExpression);

            var mother = {
                children: [1, 2]
            };
            let actual = oclRule.evaluate(mother);
            actual.should.be.ok();
        });

        it('should process union', () => {
            const oclExpression = `
            context Object
                def: let concat: self.a->union(self.b)
                inv: self.concat->size() = 4
        `;
            const oclRule = OclParser.parse(oclExpression);
            var o = {
                a: [1, 2],
                b: [3, 4]
            };
            let actual = oclRule.evaluate(o);
            actual.should.be.ok();
        });
    })
});

