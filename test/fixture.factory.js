export class FixtureFactory {
    static createPerson(name, age) {
        return new Person(name, age);
    }
}

export class Person {
    constructor(name, age) {
        this.name = name;
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