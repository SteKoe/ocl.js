import { FixtureFactory } from '../fixture.factory';
import { OclEngine } from '../../lib';
import { expect } from 'chai';

describe('enumeration', () => {
    const Gender = {
        MALE: 'male',
        FEMALE: 'female',
        OTHER: 'other',
        'GENDER-FEMALE': 'female'
    };

    let mother;
    let oclEngine;

    beforeEach(() => {
        oclEngine = OclEngine.create();
        oclEngine.registerEnum('Gender', Gender);

        mother = FixtureFactory.createPerson('Hilde', 50);
        mother.gender = Gender.FEMALE;
    });

    it('should work when addressing existing enum key', () => {
        oclEngine.addOclExpression('context Person inv: self.gender = Gender::FEMALE');
        const oclResult = oclEngine.evaluate(mother);
        const result = oclResult.getResult();
        expect(result).to.be.true;
    });

    it('should return false when addressing non existing enum key', () => {
        oclEngine.addOclExpression('context Person inv: self.gender = Gender::NONE');
        const oclResult = oclEngine.evaluate(mother);
        const result = oclResult.getResult();
        expect(result).to.be.false;
    });

    it('should return false when addressing escaped property', () => {
        mother.gender = Gender['GENDER-FEMALE'];

        oclEngine.addOclExpression("context Person inv: self.gender = Gender::_'GENDER-FEMALE'");
        const oclResult = oclEngine.evaluate(mother);
        const result = oclResult.getResult();
        expect(result).to.be.true;
    });

    it('should return false when addressing escaped property 2', () => {
        mother.gender = Gender['GENDER-FEMALE'];
        oclEngine.addOclExpression('context Person inv: self.gender = Gender::_"GENDER-FEMALE"');
        const oclResult = oclEngine.evaluate(mother);
        const result = oclResult.getResult();
        expect(result).to.be.true;
    });

    it('should return false when addressing non existing enum', () => {
        oclEngine.addOclExpression('context Person inv: self.gender = UnknownEnum::NONE');
        const oclResult = oclEngine.evaluate(mother);
        const result = oclResult.getResult();
        expect(result).to.be.false;
    });

    it('should return false when value does not match, but exists', () => {
        oclEngine.addOclExpression('context Person inv: self.gender = Gender::MALE');
        const oclResult = oclEngine.evaluate(mother);
        const result = oclResult.getResult();
        expect(result).to.be.false;
    });
});
