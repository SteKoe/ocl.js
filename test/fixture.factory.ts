export class FixtureFactory {
    static createPerson(name, age = 21) : Person {
        const person = new Person(age);
        person.name = name;
        return person;
    }
}

export class Dog {

}

export class Human {

}

export class Person extends Human {
    age: any;
    name: string;
    children: any[] = [];
    income: number;
    jobs: Job[] = [];
    parents: Person[] = [];
    fleet: Car[] = [];

    constructor(age = 21) {
        super();
        this.age = age;
    }

    getChildren() {
        return this.children;
    }
}

export class Job {
    salary: number;
}

export class MetaEntity {
    metaAssociationLinks: MetaAssociationLink[];
    isType: boolean;
    isIntrinsic: boolean;
}

export class MetaAssociationLink {
    roleName: any;

    constructor(roleName) {
        this.roleName = roleName;
    }
}


export class MetaAttribute {
    minCard: number;
    maxCard: number;
}

export class Company {
    employees: any[] = [];

    hire(person) {
        this.employees.push(person);
    }
}


export class Car {
    typeName: string = 'Car';
    color: any;
    owner: Person;

    constructor(color) {
        this.color = color;
    }
}

export class Library {
    writers: any[];

    constructor() {
        this.writers = [];
    }
}

export class Writer {
    name: any;
    books: Book[];

    constructor(name) {
        this.name = name;
        this.books = [];
    }
}

export class Book {
    title: any;

    constructor(title) {
        this.title = title;
    }
}
