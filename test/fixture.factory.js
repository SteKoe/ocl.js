export class FixtureFactory {
    static createPerson(name, age) {
        const person = new Person(age);
        person.name = name;
        return person;
    }
}

export class Person {
    constructor(age) {
        this.age = age;
    }

    getChildren() {
        return this.children;
    }
}

export class MetaEntity {
}

export class MetaAssociationLink {
    constructor(roleName) {
        this.roleName = roleName;
    }
}

export class Car {
    constructor(color) {
        this.typeName = 'Car';
        this.color = color;
    }
}

export class Library {
    constructor() {
        this.writers = [];
    }
}

export class Writer {
    constructor(name) {
        this.name = name;
        this.books = [];
    }
}

export class Book {
    constructor(title) {
        this.title = title;
    }
}
