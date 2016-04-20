'use strict';
import OclParserGenerator from './../lib/oclParserGenerator'

const should = require('should');
let OclParser;

describe('OCLInterpreter: let', () => {
    before(() => {
        OclParserGenerator.generate();
        OclParser = require('./../lib/oclParser').default;
    });

    it('should set simple string variable', () => {
        const oclExpression = `
            context Person
                def: let variable: "test"
                inv: self.variable = "test"
        `;
        const oclRule = new OclParser(oclExpression).parse();

        var a = {};
        let actual = oclRule.evaluate(a);
        actual.should.be.ok();
    });

    it('should set simple string variable without let', () => {
        const oclExpression = `
            context Person
                def: variable: "test"
                inv: self.variable = "test"
        `;
        const oclRule = new OclParser(oclExpression).parse();

        var a = {};
        let actual = oclRule.evaluate(a);
        actual.should.be.ok();
    });

    it('should assign ->size() call', () => {
        const oclExpression = `
            context Person
                def: let childCount: self.children->size()
                inv: self.childCount = 2
        `;
        const oclRule = new OclParser(oclExpression).parse();

        var mother = {
            children: [1,2]
        };
        let actual = oclRule.evaluate(mother);
        actual.should.be.ok();
    });

    it('should process union', () => {
        const oclExpression = `
            context Person
                def: let concat: self.a->union(self.b)
                inv: self.concat->size() = 4
        `;
        const oclRule = new OclParser(oclExpression).parse();
        var o = {
            a: [1,2],
            b: [3,4]
        };
        let actual = oclRule.evaluate(o);
        actual.should.be.ok();
    });
});

