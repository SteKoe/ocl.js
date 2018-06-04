export default class Library {
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