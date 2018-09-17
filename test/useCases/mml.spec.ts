import {MetaAssociationLink, MetaEntity} from '../fixture.factory';
import {expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue} from '../matcher';

describe('Example', () => {
    describe('MML', () => {
        it('MetaEntity metaAssociationLinks have different role names.', () => {
            const metaEntity = new MetaEntity();
            metaEntity.metaAssociationLinks = [
                new MetaAssociationLink('roleA'),
                new MetaAssociationLink('roleB')
            ];
            const oclExpression = 'context MetaEntity inv: self.metaAssociationLinks->forAll(a1,a2|a1<>a2 implies a1.roleName <> a2.roleName)';
            expectOclRuleValidatesToTrue(oclExpression, metaEntity);
        });

        it('MetaEntity: self.isType = true implies self.isIntrinsic = false', () => {
            const metaEntity = new MetaEntity();
            metaEntity.isType = true;
            metaEntity.isIntrinsic = false;

            const oclExpression = 'context MetaEntity inv: self.isType = true implies self.isIntrinsic = false';
            expectOclRuleValidatesToTrue(oclExpression, metaEntity);

            metaEntity.isIntrinsic = true;
            expectOclRuleValidatesToFalse(oclExpression, metaEntity);
        });
    });
});
