'use strict';
import {expect} from 'chai';
import {OclEngine} from "../../lib/components/OclEngine";
import {FixtureFactory, MetaAssociationLink, MetaEntity} from "../fixture.factory";

require('../../generator/oclParserGenerator');

describe('OclEngine', function () {
    it('should manage oclExpressions by target type.', function () {
        const oclEngine = OclEngine.create()
            .addOclExpression(`
                context MetaEntity inv: 
                    self.metaAssociationLinks->forAll(a1,a2|a1<>a2 implies a1.roleName <> a2.roleName)
            `);

        expect(oclEngine.getOclExpressionsForType('MetaEntity').length).to.eql(1)
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

        expect(oclEngine.getOclExpressionsForType('MetaEntity').length).to.be.eql(2);
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

        let result = OclEngine.create()
            .addOclExpression(rule_distinctRoleNames)
            .addOclExpression(rule_ifTypeImpliesIntrinsic)
            .evaluate(metaEntity)
            .getResult()
        expect(result).to.be.true;
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

        expect(oclEngine.evaluate(metaEntity).getResult()).to.be.false;
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
        expect(evaluationResult.getResult()).to.be.false;
        expect(evaluationResult.getNamesOfFailedInvs()).to.contain('linkNamesMustBeUnique');
    });

    it('should allow to add multiple constraints as array', function () {
        const oclConstraints = [
            `
                context MetaEntity 
                    inv linkNamesMustBeUnique: self.metaAssociationLinks->forAll(a1,a2|a1<>a2 implies a1.roleName <> a2.roleName)
                `,
            `
                context MetaEntity inv: 
                    1=1asdasdsd
                `
        ];

        const oclEngine = new OclEngine();

        try {
            oclEngine.addOclExpressions(oclConstraints);
        } catch (e) {
            expect(e.oclExpression).to.eql(oclConstraints[1])
        }
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

            actual = oclEngine._inferType({type: 'Edge'})
            expect(actual).to.equal('Object');

            oclEngine.setTypeDeterminer(obj => obj.type);

            actual = oclEngine._inferType({type: 'Edge'})
            expect(actual).to.equal('Edge');

            OclEngine.Utils.typeDeterminerFn = undefined;
        });

        it('should allow to add multiple constraints as array', function () {
            const oclConstraints = [
                `
                context MetaEntity 
                    inv linkNamesMustBeUnique: self.metaAssociationLinks->forAll(a1,a2|a1<>a2 implies a1.roleName <> a2.roleName)
                `,
                `
                context MetaEntity inv: 
                    self.isType = true implies self.isIntrinsic = false
                `
            ]
            const oclEngine = new OclEngine();

            oclEngine.addOclExpressions(oclConstraints);

            let metaEntity = new MetaEntity();
            metaEntity.metaAssociationLinks = [
                new MetaAssociationLink('roleA'),
                new MetaAssociationLink('roleA')
            ];

            const evaluationResult = oclEngine.evaluate(metaEntity);
            expect(evaluationResult.getResult()).to.be.false;
            expect(evaluationResult.getNamesOfFailedInvs()).to.contain('linkNamesMustBeUnique');
        });
    });
});
