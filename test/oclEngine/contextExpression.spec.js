import { expect } from 'chai';
import { Person } from '../fixture.factory'
import { OclEngine } from '../../lib'

describe('ContextExpression', function () {
    let oclEngine = OclEngine.create();
    oclEngine.registerTypes({
        "Person": Person
    })

    it('should skip non machting ContextExpressions', function () {
        oclEngine.addOclExpression(`
            context Object inv: 1 = 1
            context Person inv: age = 42
            context Company inv: self.managers->size() > 0
        `);

        let oclResult = oclEngine.evaluate(new Person(42));
        let result = oclResult.getResult();
        expect(result).to.be.true;
    });
});
