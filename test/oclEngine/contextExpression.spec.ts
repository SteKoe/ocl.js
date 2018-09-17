import { expect } from 'chai';
import { Person } from '../fixture.factory';
import { OclEngine } from '../../lib';

describe('ContextExpression', () => {
    const oclEngine = OclEngine.create();
    oclEngine.registerTypes({
        Person
    });

    it('should skip non machting ContextExpressions', () => {
        oclEngine.addOclExpression(`
            context Object inv: 1 = 1
            context Person inv: age = 42
            context Company inv: self.managers->size() > 0
        `);

        const oclResult = oclEngine.evaluate(new Person(42));
        const result = oclResult.getResult();
        expect(result).to.be.true;
    });
});
