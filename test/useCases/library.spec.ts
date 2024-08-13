import { Book, Library, Writer } from '../fixture.factory';
import {expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue} from '../matcher';

describe('Example', () => {
    describe('Library', () => {
        it('parent is same', () => {
            const library = new Library();

            const julesVerne = new Writer('Jules Verne');
            julesVerne.books.push(new Book('Le Tour du monde en quatre-vingts jours'));
            julesVerne.books.push(new Book('Vingt mille lieues sous les mers'));

            library.writers.push(julesVerne);
            library.writers.push(new Writer('Unknown Author'));

            const oclExpression = `
                context Library
                    def: unpublishedWriters = writers->select(books->isEmpty())
                    inv: unpublishedWriters->isEmpty()
            `;
            expectOclRuleValidatesToFalse(oclExpression, library);
        });

        describe('should work without collector', () => {
            const obj = {
                name: 'example',
                videogames: ['A', 'B', 'C', 'D', 'A'],
                books: ['R', 'S', 'T']
            }

            it('works with self.books as reference to collection', () => {
                const oclExpression = 'context Object inv: self.books->isUnique(books)';
                expectOclRuleValidatesToTrue(oclExpression, obj);
            })
            
            it('works on collection', () => {
                const oclExpression = 'context Object inv: books->isUnique(videgames)';
                expectOclRuleValidatesToTrue(oclExpression, obj);
            })
            
            it('works without iterator', () => {
                const oclExpression = 'context Object inv: books->isUnique()';
                expectOclRuleValidatesToTrue(oclExpression, obj);
            })
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

        it('parent is same', () => {
            const library = new Library();

            const julesVerne = new Writer('Jules Verne');
            julesVerne.books.push(new Book('Le Tour du monde en quatre-vingts jours'));
            julesVerne.books.push(new Book('Vingt mille lieues sous les mers'));

            library.writers.push(julesVerne);
            library.writers.push(new Writer('Unknown Author'));

            const oclExpression = `
            context Library
            -- we can define additional operations and attributes to assist
            -- in the formulation of our constraints
            def: unpublishedWriters : Set(Writer) = writers->select(books->isEmpty())
            -- so, here we use one such definition
            inv writers_have_written: unpublishedWriters->isEmpty()
        `;
            expectOclRuleValidatesToFalse(oclExpression, library);
        });

        it('selects writers without books', () => {
            const library = new Library();

            const julesVerne = new Writer('Jules Verne');
            julesVerne.books.push(new Book('Le Tour du monde en quatre-vingts jours'));
            julesVerne.books.push(new Book('Vingt mille lieues sous les mers'));

            const unknownAuthor = new Writer('Unknown Author');

            library.writers.push(julesVerne);
            library.writers.push(unknownAuthor);

            const oclExpression = 'context Library inv: writers->select(books->isEmpty())->size() = 1';
            expectOclRuleValidatesToTrue(oclExpression, library);
        });
    });
});
