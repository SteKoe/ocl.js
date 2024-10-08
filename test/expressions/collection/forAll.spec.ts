import { Book, FixtureFactory, Library, Writer } from '../../fixture.factory';
import { expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue } from '../../matcher';

describe('Collection->forAll', () => {
    let mother;

    beforeEach(() => {
        mother = FixtureFactory.createPerson('Hilde', 50);
    });

    it('should evaluate forAll(c|...): negative', () => {
        mother.children = [
            FixtureFactory.createPerson('A', 10),
            FixtureFactory.createPerson('B', 50)
        ];
        const oclExpression = 'context Person inv ChildrenAreAllYounger: self.children->forAll(c|c.age < self.age)';
        expectOclRuleValidatesToFalse(oclExpression, mother);
    });

    it('should evaluate forAll(c|...): positive', () => {
        mother.children = [
            FixtureFactory.createPerson('A', 10),
            FixtureFactory.createPerson('B', 40)
        ];

        const oclExpression = 'context Person inv: self.children->forAll(c|c.age < self.age)';
        expectOclRuleValidatesToTrue(oclExpression, mother);
    });

    it('should evaluate forAll(c1,c2|...): positive', () => {
        mother.children = [
            FixtureFactory.createPerson('A', 1),
            FixtureFactory.createPerson('B', 2),
            FixtureFactory.createPerson('C', 3),
            FixtureFactory.createPerson('D', 4),
            FixtureFactory.createPerson('E', 5)
        ];

        const oclExpression = 'context Person inv: self.children->forAll(c1, c2|c1.age <> c2.age)';
        expectOclRuleValidatesToTrue(oclExpression, mother);
    });

    it('should evaluate forAll(c1,c2|...): negative', () => {
        mother.children = [
            FixtureFactory.createPerson('A', 1),
            FixtureFactory.createPerson('B', 2),
            FixtureFactory.createPerson('C', 2),
            FixtureFactory.createPerson('D', 4),
            FixtureFactory.createPerson('E', 5)
        ];

        const oclExpression = 'context Person inv: self.children->forAll(c1, c2|c1.age <> c2.age)';
        expectOclRuleValidatesToFalse(oclExpression, mother);
    });

    it('should iterate over collected items without having a collector', () => {
        mother.children = [
            FixtureFactory.createPerson('A', 1),
            FixtureFactory.createPerson('B', 2),
            FixtureFactory.createPerson('C', 4),
            FixtureFactory.createPerson('D', 8),
            FixtureFactory.createPerson('E', 10),
        ];

        let oclExpression = 'context Person inv: self.children->forAll(age <= 10)';
        expectOclRuleValidatesToTrue(oclExpression, mother);

        oclExpression = 'context Person inv: self.children->forAll(age < 10)';
        expectOclRuleValidatesToFalse(oclExpression, mother);
    });

    it('should properly handle self in expression', () => {
        mother.children = [
            FixtureFactory.createPerson('A', 1),
            mother
        ];

        let oclExpression = 'context Person inv: self.children->forAll(c | c <> self)';
        expectOclRuleValidatesToFalse(oclExpression, mother);

        oclExpression = 'context Person inv: self.children->forAll(c | self <> c)';
        expectOclRuleValidatesToFalse(oclExpression, mother);
    });

    describe('forAll with nested collection expressions', () => {
        let library;
        beforeEach(() => {
            library = new Library();
            library.writers = [new Writer('Joe'), new Writer('Alice'), new Writer('Ben')];
            library.writers[0].books = [
                new Book('A great tale', 9.99),
                new Book('An awesome tale', 9.99),
                new Book('Biography', 15.99),
                new Book('Some light thriller', 10)
            ];
            library.writers[1].books = [new Book('Biography', 5.99), new Book('A tale', 19.99)];
            library.writers[2].books = [
                new Book('Biography', 15),
                new Book('A tale', 10),
                new Book('Cookbook for Cakes', 20),
                new Book('Cookbook for Cookies', 20),
                new Book('Cookbook for Vegetables', 25)
            ];
            library.writers[1].books[1].awards.push('Best Newcomer');
            library.writers[2].books[2].awards.push('Pulitzer Prize');
        });

        it('should handle nested collection expressions with variables correctly', () => {
            let oclExpression =
                'context Library inv: self.writers->forAll(w | w.books->exists(b | b.title = "Biography"))';
            expectOclRuleValidatesToTrue(oclExpression, library);
            oclExpression = 'context Library inv: self.writers->forAll(w | w.books->exists(b | b.title = "Good book"))';
            expectOclRuleValidatesToFalse(oclExpression, library);

            oclExpression = 'context Library inv: self.writers->forAll(w | w.books->one(b | b.title = "Biography"))';
            expectOclRuleValidatesToTrue(oclExpression, library);
            oclExpression = 'context Library inv: self.writers->forAll(w | w.books->one(b | b.title = "A tale"))';
            expectOclRuleValidatesToFalse(oclExpression, library);

            oclExpression = 'context Library inv: self.writers->forAll(w | w.events->isEmpty())';
            expectOclRuleValidatesToTrue(oclExpression, library);
            oclExpression = 'context Library inv: self.writers->forAll(w | w.books->isEmpty())';
            expectOclRuleValidatesToFalse(oclExpression, library);

            oclExpression = 'context Library inv: self.writers->forAll(w | w.books->notEmpty())';
            expectOclRuleValidatesToTrue(oclExpression, library);
            oclExpression = 'context Library inv: self.writers->forAll(w | w.events->notEmpty())';
            expectOclRuleValidatesToFalse(oclExpression, library);

            oclExpression = 'context Library inv: self.writers->forAll(w | w.books->isUnique(b | b.title))';
            expectOclRuleValidatesToTrue(oclExpression, library);
            oclExpression = 'context Library inv: self.writers->forAll(w | w.books->isUnique(b | b.price))';
            expectOclRuleValidatesToFalse(oclExpression, library);
        });

        it('should handle double nested collection expressions correctly', () => {
            let oclExpression =
                'context Library inv: self.writers->forAll(w | w.books->forAll(b | b.awards->exists(a | a = "Spiegel Bestseller")))';
            expectOclRuleValidatesToTrue(oclExpression, library);

            oclExpression =
                'context Library inv: self.writers->forAll(w | w.books->forAll(b | b.awards->exists(a | a = "Pulitzer Prize")))';
            expectOclRuleValidatesToFalse(oclExpression, library);
        });
    });
});
