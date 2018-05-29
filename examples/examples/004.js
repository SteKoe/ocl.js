import Person from "../class/person";
import Example from "../class/example";
import OclEngine from "../../dist/ocl.min";

const title = 'A person younger than 18 years old owns no cars.';
const context = `var person = new Person(6);`;
const oclExpression = [
    'context Person',
    '   inv: self.age < 18 implies self.fleet->isEmpty'
].join('\n');

const fn = function () {
    const person = new Person(6);

    return new OclEngine()
        .addOclExpression(this.oclExpression)
        .evaluate(person);
};

module.exports = Example.builder()
    .title(title)
    .context(context)
    .oclExpression(oclExpression)
    .expected(true)
    .fn(fn)
    .build();