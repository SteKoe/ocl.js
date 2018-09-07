import {FixtureFactory} from "../fixture.factory";
import {OclEngine} from "../../lib";
import {expect} from "chai";

describe('enumeration', () => {
    const Gender = {
        MALE: 'male',
        FEMALE: 'female',
        OTHER: 'other'
    };

    const oclEngine = OclEngine.create();
    oclEngine.registerEnum('Gender', Gender);

    const mother = FixtureFactory.createPerson('Hilde', 50);
    mother.gender = Gender.FEMALE;

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
