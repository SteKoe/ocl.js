'use strict';
const should = require('should');

import OclParserGenerator from './../../lib/oclParserGenerator'

describe('Math', () => {
    let OclParser;

    before(() => {
        OclParserGenerator.generate();
        OclParser = require('./../../lib/oclParser').default;
    });

    it('should evaluate addition.', () => {
        const oclExpression = `
            context Person inv:
                1 + 2 = 3
       `;

        const oclRule = new OclParser(oclExpression).parse();
        let actual = oclRule.evaluate();
        actual.should.be.true();
    });

    it('should evaluate substraction.', () => {
        const oclExpression = `
            context Person inv:
                1.0 - 2 = -1
       `;

        const oclRule = new OclParser(oclExpression).parse();
        let actual = oclRule.evaluate();
        actual.should.be.true();
    });

    it('should evaluate division.', () => {
        const oclExpression = `
            context Person inv:
                10 / 2 = 5
       `;

        const oclRule = new OclParser(oclExpression).parse();
        let actual = oclRule.evaluate();
        actual.should.be.true();
    });

    it('should evaluate division using div.', () => {
        const oclExpression = `
            context Person inv:
                10 div 5 = 2
       `;

        const oclRule = new OclParser(oclExpression).parse();
        let actual = oclRule.evaluate();
        actual.should.be.true();
    });

    it('should evaluate multiply.', () => {
        const oclExpression = `
            context Person inv:
                -2.5 * 2 = -5
       `;

        const oclRule = new OclParser(oclExpression).parse();
        let actual = oclRule.evaluate();
        actual.should.be.true();
    });

    it('should evaluate modulo.', () => {
        const oclExpression = `
            context Person inv:
                7 mod 4 = 3
       `;

        const oclRule = new OclParser(oclExpression).parse();
        let actual = oclRule.evaluate();
        actual.should.be.true();
    });
});