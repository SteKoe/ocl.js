const should = require('should');

import {ContextExpression} from '../../src/components/expressions/contextExpression'
const expr = new ContextExpression();

describe('ContextExpression', () => {
    it('should return undefined for plain json', () => should(expr._getClassName({})).be.eql('Object'));
    it('should return name for named function', () => should(expr._getClassName(function Abc() {})).be.eql('Abc'));
    it('should return undefined anonymous function', () => should(expr._getClassName(function () {})).be.undefined());
    it('should return name of class', () => {
        class Abc {}
        should(expr._getClassName(new Abc())).be.eql('Abc')
    })
});