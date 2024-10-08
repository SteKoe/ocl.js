export class FixtureFactory {
    static createPerson(name, age = 21): Person {
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
    gender: string;
    children: Array<Person> = [];
    income: number;
    jobs: Array<Job> = [];
    parents: Array<Person> = [];
    fleet: Array<Car> = [];
    private isAlive = true;

    constructor(age = 21) {
        super();
        this.age = age;
    }

    setAge(age: number): void {
        this.age = age;
    }

    getAge(): number {
        return this.age;
    }

    setDead(): void {
        this.isAlive = false;
    }

    getChildren(): Array<Person> {
        return this.children;
    }
}

export class Job {
    salary: number;

    constructor(salary?: number) {
        this.salary = salary;
    }
}

export class MetaEntity {
    metaAssociationLinks: Array<MetaAssociationLink>;
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
    employees: Array<Person> = [];

    hire(person: Person): void {
        this.employees.push(person);
    }
}

export class AstSequenceFlow {
    source: any;
    target: any;
}

export class Car {
    typeName = 'Car';
    color: any;
    owner: Person;

    constructor(color) {
        this.color = color;
    }
}

export class Library {
    writers: Array<any>;

    constructor() {
        this.writers = [];
    }
}

export class Writer {
    name: any;
    books: Array<Book>;
    events: Array<any>;

    constructor(name) {
        this.name = name;
        this.books = [];
        this.events = [];
    }
}

export class Book {
    title: string;
    price: number;
    awards: string[];

    constructor(title: string, price?: number) {
        this.title = title;
        this.price = price;

        this.awards = ["Spiegel Bestseller"]
    }
}
