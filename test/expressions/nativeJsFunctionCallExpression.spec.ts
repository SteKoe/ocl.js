import {expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue} from '../matcher'
import {FixtureFactory} from "../fixture.factory";

describe('Eval FunctionCall', () => {
    const mother = FixtureFactory.createPerson('Hilde');
    mother.children = [
        FixtureFactory.createPerson('A', 1),
        FixtureFactory.createPerson('B', 9),
        FixtureFactory.createPerson('C', 18)
    ];

    it('should use eval to evaluate native method on object', () => {
        const oclExpression = `context Person inv: self.getChildren()->exists(c|c.age > 20)`;
        expectOclRuleValidatesToFalse(oclExpression, mother);
    });

    it('should call nested native functions', () => {
        const A = {
            getB() {
                return {
                    getC() {
                        return "C";
                    }
                }
            }
        }
        const oclExpression = `context Object inv: self.getB().getC() = "C"`;
        expectOclRuleValidatesToTrue(oclExpression, A);
    });

    it('should evaluate to false if function cannot be called', () => {
        const oclExpression = `context Person inv: self.notDefinedFunction()`;
        expectOclRuleValidatesToFalse(oclExpression, mother);
    });

    it('should evaluate to false if object the function is called on is undefined', () => {
        const oclExpression = `context Person inv: self.undefinedProperty.undefinedFunction()`;
        expectOclRuleValidatesToFalse(oclExpression, mother);
    });

    it('should accept one parameter in a function call', () => {
        const A = {
            getValue(val) {
                return val;
            }
        }
        const oclExpression = `context Object inv: self.getValue("A") = "A"`;
        expectOclRuleValidatesToTrue(oclExpression, A);
    });

    it('should accept more parameters in a function call', () => {
        const A = {
            add(a, b) {
                return a + b;
            }
        }
        const oclExpression = `context Object inv: self.add(6,4) = 10`;
        expectOclRuleValidatesToTrue(oclExpression, A);
    });

    it('does even work with nested function calls', () => {
        const A = {
            add(a, b) {
                return a + b;
            }
        }
        const oclExpression = `context Object inv: self.add(6, self.add(2,2)) = 10`;
        expectOclRuleValidatesToTrue(oclExpression, A);
    });
});
