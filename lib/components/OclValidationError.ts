export class OclValidationError implements Error {
    name: string;

    constructor(public message: string) {
    }
}
