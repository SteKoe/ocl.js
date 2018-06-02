'use strict';
import { expect } from "chai";
import { OclParser } from "../../lib/components/parser/OclParser";

require('../../generator/oclParserGenerator');

describe('OCLInterpreter ', () => {
    describe('not', () => {
        it('not true => false', () => {
            let oclExpression = `
                context Object
                    inv notExpression: not true
            `;

            let oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate();
            expect(actual).to.be.false;
        });
    });
});

