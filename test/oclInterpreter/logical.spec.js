'use strict';
const should = require('should');

require('../../generator/oclParserGenerator');
import {OclParser} from "../../lib/components/parser/OclParser";

describe('logical expressions', () => {
    const testCases = [
        {oclExpression: 'context Object inv: true and true', expectedResult: true},
        {oclExpression: 'context Object inv: true and false', expectedResult: false},
        {oclExpression: 'context Object inv: false and false', expectedResult: false},
        {oclExpression: 'context Object inv: false and true', expectedResult: false},
        {oclExpression: 'context Object inv: true and (true or false)', expectedResult: true},
        {oclExpression: 'context Object inv: (true and false) or true', expectedResult: true},
        {oclExpression: 'context Object inv: true and false or true and true', expectedResult: true}
    ];

    testCases.forEach(testCase => {
        it(`should evaluate ${testCase.oclExpression}`, () => {
            const oclRule = OclParser.parse(testCase.oclExpression);
            if (testCase.expectedResult === true) {
                oclRule.evaluate().should.be.true();
            } else {
                oclRule.evaluate().should.be.false();
            }
        });
    });
});