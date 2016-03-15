(function() {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }

    (function example1() {
        var person = new Person('Stephan', 29);

        var oclExpression = [
            'context Person',
            '   inv: self.parent <> self'
        ].join('\n');

        var oclRule = new OclParser(oclExpression).parse();
        printResult('example1', oclRule.evaluate(person));
    })();

    (function example2() {
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
        printResult('example2', oclRule.evaluate(mother));
    })();

    (function example3() {
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
        printResult('example3', oclRule.evaluate(mother));
    })();

    function printResult(id, isValid) {
        document.getElementById(id + '-result').innerHTML = isValid ? 'valid' : 'invalid';
    }
})();