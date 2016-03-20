import OclParser from '../lib/oclParser';

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.typeName = 'Person';
    }
}

class Example {
    constructor(id) {
        this.id = id;
    }

    expect(expected) {
        this.expected = expected;
        return this;
    }

    run(fn) {
        const elementById = document.getElementById(`example${this.id}-result`);
        if (elementById) {
            elementById.innerText = fn() ? 'valid' : 'invalid';
            elementById.innerText += ` expected ${this.expected ? 'valid' : 'invalid'}!`
        }
    }
}

new Example(1).expect(true).run(() => {
    var person = new Person('Stephan', 29);

    var oclExpression = [
        'context Person',
        '   inv: self.parent <> self'
    ].join('\n');

    var oclRule = new OclParser(oclExpression).parse();
    return oclRule.evaluate(person)
});

new Example(2).expect(true).run(() => {
    var oclExpression = [
        'context Person',
        '   inv ChildrenAreAllYounger: self.children->forAll(c|c.age < self.age)'
    ].join('\n');

    var mother = new Person("Henriette", 67);
    mother.children = [
        {name: 'Heike', age: 27},
        {name: 'Swen', age: 47}
    ];

    const oclRule = new OclParser(oclExpression).parse();
    return oclRule.evaluate(mother);
});

new Example(3).expect(false).run(() => {
    var mother = new Person("Henriette", 67);
    mother.children = [
        {name: 'Heike', age: 27},
        {name: 'Swen', age: 47},
        {name: 'Heike', age: 30}
    ];

    var oclExpression = [
        'context Person',
        '   inv: self.children->forAll(c1,c2| c1.name <> c2.name)'
    ].join('\n');

    var oclRule = new OclParser(oclExpression).parse();
    return oclRule.evaluate(mother);
});

new Example(5).expect(false).run(() => {
    class MetaEntity {
        constructor() {
            this.typeName = 'MetaEntity';
        }
    }

    const metaEntity = new MetaEntity();
    metaEntity.name = "Employee";
    metaEntity.isIntrinsic = true;
    metaEntity.metaAttribute = [
        {name: 'lastName', type: 'string'},
        {name: 'firstName', type: 'float', isIntrinsic: true},
        {name: 'dateOfBirth', type: 'date', isIntrinsic: true},
        {name: 'formalQualification', type: 'string', isIntrinsic: true}
    ];

    var oclExpression = [
        'context MetaEntity inv:',
        '   self.isIntrinsic = true implies self.metaAttribute->forAll(a | a.isInstrinsic = true)'
    ].join('\n');

    var oclRule = new OclParser(oclExpression).parse();
    return oclRule.evaluate(metaEntity);
});