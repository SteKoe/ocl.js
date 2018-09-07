import { expect } from 'chai';
import { OclEngine } from '../../lib';

describe('UseCase', () => {
    let oclEngine;

    beforeEach(() => {
        oclEngine = OclEngine.create();
    });

    describe('GitHub', () => {
        it('self.Type = VoterIdType::other implies not self.OtherType.oclIsUndefined()', () => {
            const VoterIdType = {
                someVoterIdType: 'someVoterIdType',
                other: 'other'
            };

            oclEngine.registerEnum('VoterIdType', VoterIdType);
            oclEngine.addOclExpression(`
                context Object inv ViOtherTypeMustBeDefined:
                    self.Type = VoterIdType::other implies not self.OtherType.oclIsUndefined()
            `);

            const voterId = {
                Type: VoterIdType.other,
                OtherType: undefined
            };

            let evaluationResult = oclEngine.evaluate(voterId);
            expect(evaluationResult.getResult()).to.be.false;

            voterId.OtherType = VoterIdType.someVoterIdType;
            evaluationResult = oclEngine.evaluate(voterId);
            expect(evaluationResult.getResult()).to.be.true;
        });
    });
});
