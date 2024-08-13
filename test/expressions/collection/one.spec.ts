import {expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue} from '../../matcher';
import {Book, Library, Writer} from "../../fixture.factory";

describe('Collection->one ', () => {
    it('should return true if there is exactly one matching element', () => {
        const oclExpression = 'context Object inv: self->one(a < 1) = true';
        expectOclRuleValidatesToTrue(oclExpression, [1.2, 2.3, 5.2, 0.9]);
    });

    it('should return false if there is more than one matching element', () => {
        const oclExpression = 'context Object inv: self->one(a < 2) = false';
        expectOclRuleValidatesToTrue(oclExpression, [1.2, 2.3, 5.2, 0.9]);
    });

    it('should return false if there is no matching element', () => {
        const oclExpression = 'context Object inv: self->one(a < 0) = false';
        expectOclRuleValidatesToTrue(oclExpression, [1.2, 2.3, 5.2, 0.9]);
    });

    it('should return false if there is no matching property in object', () => {
        const oclExpression = 'context Object inv: self->one(obj | obj.a > 0) = true';
        expectOclRuleValidatesToTrue(oclExpression, [
            {a: 1},
            {c: 2},
            {b: 3}
        ]);
    });

    it('should return false if there is no matching property in object', () => {
        const library = new Library();
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

        let oclExpression = 'context Library inv: self.writers->forAll(w | w.books->isUnique(price))';
        expectOclRuleValidatesToFalse(oclExpression, library);

        oclExpression = 'context Library inv: self.writers->forAll(w | w.books->one(title = "Biography"))';
        expectOclRuleValidatesToTrue(oclExpression, library);
    });
});
