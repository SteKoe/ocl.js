'use strict';
import OclEngine from './../../lib/oclEngine'

const should = require('should');

describe.only('OclEngine', function () {
    it('should manage oclExpressions by target type.', function () {
        const oclEngine = new OclEngine();
        oclEngine.addOclExpression(`
            context MetaEntity inv: 
                self.metaAssociationLinks->forAll(a1,a2|a1<>a2 implies a1.roleName <> a2.roleName)
        `);

        oclEngine.getOclExpressionsForType('MetaEntity').length.should.be.eql(1);
    });

    it('should manage multiple oclExpressions by target type.', function () {
        const oclEngine = new OclEngine();
        oclEngine.addOclExpression(`
            context MetaEntity inv: 
                self.metaAssociationLinks->forAll(a1,a2|a1<>a2 implies a1.roleName <> a2.roleName)
        `);
        oclEngine.addOclExpression(`
            context MetaEntity inv: 
                self.isType = true implies self.isIntrinsic = false
        `);

        oclEngine.getOclExpressionsForType('MetaEntity').length.should.be.eql(2);
    });

    it('should evaluate oclExpression for given instance data when all are valid.', function() {
        const oclEngine = new OclEngine();
        oclEngine.addOclExpression(`
            context MetaEntity inv: 
                self.metaAssociationLinks->forAll(a1,a2|a1<>a2 implies a1.roleName <> a2.roleName)
        `);
        oclEngine.addOclExpression(`
            context MetaEntity inv: 
                self.isType = true implies self.isIntrinsic = false
        `);

        let metaEntity = new MetaEntity();
        metaEntity.metaAssociationLinks = [
            new MetaAssociationLink('roleA'),
            new MetaAssociationLink('roleB')
        ];
        
        oclEngine.evaluate(metaEntity).should.be.ok();
    });

    it('should evaluate oclExpression for given instance data when one is invalid.', function() {
        const oclEngine = new OclEngine();
        oclEngine.addOclExpression(`
            context MetaEntity inv: 
                self.metaAssociationLinks->forAll(a1,a2|a1<>a2 implies a1.roleName <> a2.roleName)
        `);
        oclEngine.addOclExpression(`
            context MetaEntity inv: 
                self.isType = true implies self.isIntrinsic = false
        `);

        let metaEntity = new MetaEntity();
        metaEntity.metaAssociationLinks = [
            new MetaAssociationLink('roleA'),
            new MetaAssociationLink('roleA')
        ];

        oclEngine.evaluate(metaEntity).should.be.not.ok();
    });

});

class MetaEntity {
}
class MetaAssociationLink {
    constructor(roleName) {
        this.roleName = roleName;
    }
}
