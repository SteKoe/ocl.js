import {expect} from "chai";

import {ContextExpression} from '../../src/components/expressions/contextExpression'
const expr = new ContextExpression();

describe('ContextExpression', () => {
    it('expect return undefined for plain json', () => expect(expr._getClassName({})).to.eql('Object'));
    it('expect return name for named function', () => expect(expr._getClassName(function Abc() {})).to.eql('Abc'));
    it('expect return undefined anonymous function', () => expect(expr._getClassName(function () {})).be.undefined);
    it('expect return name of class', () => {
        class Abc {}
        expect(expr._getClassName(new Abc())).to.eql('Abc')
    })
});