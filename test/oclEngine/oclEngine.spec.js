'use strict';
const should = require('should');
import { expect } from 'chai';
import { OclEngine } from "../../lib/components/OclEngine";
import { FixtureFactory, MetaAssociationLink, MetaEntity } from "../fixture.factory";

require('../../generator/oclParserGenerator');

describe('OclEngine', function () {
    it('should manage oclExpressions by target type.', function () {
        const oclEngine = OclEngine.create()
            .addOclExpression(`
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

    it('should evaluate oclExpression for given instance data when all are valid.', function () {
        let metaEntity = new MetaEntity();
        metaEntity.metaAssociationLinks = [
            new MetaAssociationLink('roleA'),
            new MetaAssociationLink('roleB')
        ];

        let rule_distinctRoleNames = `
            context MetaEntity inv: 
                self.metaAssociationLinks->forAll(a1,a2|a1<>a2 implies a1.roleName <> a2.roleName)
        `;
        let rule_ifTypeImpliesIntrinsic = `
            context MetaEntity inv: 
                self.isType = true implies self.isIntrinsic = false
        `;

        OclEngine.create()
            .addOclExpression(rule_distinctRoleNames)
            .addOclExpression(rule_ifTypeImpliesIntrinsic)
            .evaluate(metaEntity)
            .getResult().should.be.true();
    });

    it('should evaluate oclExpression for given instance data when one is invalid.', function () {
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

        oclEngine.evaluate(metaEntity).getResult().should.be.false();
    });

    it('should allow to set names for expressions', function () {
        const oclEngine = new OclEngine();
        oclEngine.addOclExpression(`
            context MetaEntity 
                inv linkNamesMustBeUnique: self.metaAssociationLinks->forAll(a1,a2|a1<>a2 implies a1.roleName <> a2.roleName)
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

        const evaluationResult = oclEngine.evaluate(metaEntity);
        evaluationResult.getResult().should.be.false();
        evaluationResult.getNamesOfFailedInvs().should.containEql('linkNamesMustBeUnique');
    });

    describe('_inferType', () => {
        let oclEngine;

        before(() => {
            oclEngine = OclEngine.create();
        })

        it('infers types for "simple" objects', () => {
            let actual;

            actual = oclEngine._inferType({})
            expect(actual).to.equal('Object');

            actual = oclEngine._inferType("i am a string")
            expect(actual).to.be.undefined;

            actual = oclEngine._inferType(1)
            expect(actual).to.be.undefined;

            actual = oclEngine._inferType(FixtureFactory.createPerson("Stephan", 30))
            expect(actual).to.equal('Person');
        });

        it('infers types based on custom TypeDeterminer', () => {
            let actual;

            actual = oclEngine._inferType({ type: 'Edge' })
            expect(actual).to.equal('Object');

            oclEngine.setTypeDeterminer(obj => obj.type);

            actual = oclEngine._inferType({ type: 'Edge' })
            expect(actual).to.equal('Edge');

            OclEngine.Utils.typeDeterminerFn = undefined;
        });
    })
});
