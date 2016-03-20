'use strict';
const should = require('should');
import OclParser from './../lib/oclParser'

describe('OCLInterpreter', () => {
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }

    const mother = new Person('Hilde', 50);

    it('should evaluate self.parent <> self', () => {
        const oclExpression = `
            context Person
                inv: self.parent <> self
        `;
        const oclRule = new OclParser(oclExpression).parse();

        let actual = oclRule.evaluate(mother);
        actual.should.be.ok();

        mother.parent = mother;
        actual = oclRule.evaluate(mother);
        actual.should.not.be.ok();
    });

    it('should evaluate forAll(c|...): negative', () => {
        const oclExpression = `
            context Person
                inv ChildrenAreAllYounger: self.children->forAll(c|c.age < self.age)
        `;

        mother.children = [
            new Person('A', 10),
            new Person('B', 50)
        ];

        const oclRule = new OclParser(oclExpression).parse();
        let actual = oclRule.evaluate(mother);
        actual.should.not.be.ok();
    });

    it('should evaluate forAll(c|...): positive', () => {
        const oclExpression = `
            context Person inv:
                self.children->forAll(c|c.age < self.age)
        `;

        mother.children = [
            new Person('A', 10),
            new Person('B', 40)
        ];

        const oclRule = new OclParser(oclExpression).parse();
        let actual = oclRule.evaluate(mother);
        actual.should.be.ok();
    });

    it('should evaluate forAll(c1,c2|...): positive', () => {
        // All children have different ages
        const oclExpression = `
            context Person inv:
                self.children->forAll(c1, c2|c1.age <> c2.age)
        `;

        mother.children = [
            new Person('A', 1),
            new Person('B', 2),
            new Person('C', 3),
            new Person('D', 4),
            new Person('E', 5)
        ];

        const oclRule = new OclParser(oclExpression).parse();
        let actual = oclRule.evaluate(mother);
        actual.should.be.ok();
    });

    it('should evaluate implies: positive',() => {
        const oclExpression = `
            context Person inv:
                self.age > 0 implies self.age <> 0
       `;

        const oclRule = new OclParser(oclExpression).parse();
        let actual = oclRule.evaluate(mother);
        actual.should.be.ok();
    });

    it('should evaluate implies: negative',() => {
        const oclExpression = `
            context Person inv:
                self.age > 0 implies self.age = 0
       `;

        const oclRule = new OclParser(oclExpression).parse();
        let actual = oclRule.evaluate(mother);
        actual.should.not.be.ok();
    });

    it('should evaluate implies with more complex expressions',() => {
        const oclExpression = `
            context Person inv:
                self.name->isNotEmpty() implies self.name <> ""
       `;

        const oclRule = new OclParser(oclExpression).parse();
        let actual = oclRule.evaluate(mother);
        actual.should.be.ok();
    });

    it('should evaluate forAll(c1,c2|...): negative', () => {
        // All children have different ages
        const oclExpression = `
            context Person inv:
                self.children->forAll(c1, c2|c1.age <> c2.age)
        `;

        mother.children = [
            new Person('A', 1),
            new Person('B', 2),
            new Person('C', 2),
            new Person('D', 4),
            new Person('E', 5)
        ];

        const oclRule = new OclParser(oclExpression).parse();
        let actual = oclRule.evaluate(mother);
        actual.should.not.be.ok();
    });

    it('should evaluate select()', () => {
        mother.children = [
            new Person('A', 1),
            new Person('B', 2),
            new Person('C', 4),
            new Person('D', 8),
            new Person('E', 10)
        ];

        const oclExpression = `
            context Person inv:
                self.children->select(c|c.age < 10)
        `;

        const oclRule = new OclParser(oclExpression).parse();
        oclRule.evaluate(mother).should.eql([
            new Person('A', 1),
            new Person('B', 2),
            new Person('C', 4),
            new Person('D', 8)
        ]);
    });

    it('should evaluate exists()', () => {
        mother.children = [
            new Person('A', 1),
            new Person('B', 2),
            new Person('C', 4),
            new Person('D', 8),
            new Person('E', 10)
        ];

        const oclExpression = `
            context Person inv:
                self.children->exists(c|c.age > 20)
        `;

        const oclRule = new OclParser(oclExpression).parse();
        oclRule.evaluate(mother).should.be.false();
    });

});

