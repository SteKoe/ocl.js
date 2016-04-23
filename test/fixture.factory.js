export default class FixtureFactory {
    static createPerson(name, age) {
        return new Person(name, age);
    }
}

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}