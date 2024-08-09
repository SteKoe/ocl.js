import { Book, FixtureFactory, Library, Writer } from '../../fixture.factory';
import { expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue } from '../../matcher';

describe('Collection->forAll', () => {
  let mother;

  beforeEach(() => {
    mother = FixtureFactory.createPerson('Hilde', 50);
  });

  it('should evaluate forAll(c|...): negative', () => {
    mother.children = [FixtureFactory.createPerson('A', 10), FixtureFactory.createPerson('B', 50)];

    const oclExpression = 'context Person inv ChildrenAreAllYounger: self.children->forAll(c|c.age < self.age)';
    expectOclRuleValidatesToFalse(oclExpression, mother);
  });

  it('should evaluate forAll(c|...): positive', () => {
    mother.children = [FixtureFactory.createPerson('A', 10), FixtureFactory.createPerson('B', 40)];

    const oclExpression = 'context Person inv: self.children->forAll(c|c.age < self.age)';
    expectOclRuleValidatesToTrue(oclExpression, mother);
  });

  it('should evaluate forAll(c1,c2|...): positive', () => {
    mother.children = [
      FixtureFactory.createPerson('A', 1),
      FixtureFactory.createPerson('B', 2),
      FixtureFactory.createPerson('C', 3),
      FixtureFactory.createPerson('D', 4),
      FixtureFactory.createPerson('E', 5),
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
      FixtureFactory.createPerson('E', 5),
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

    const oclExpression = 'context Person inv: self.children->forAll(age < 10)';
    expectOclRuleValidatesToFalse(oclExpression, mother);
  });

  it('should properly handle self in expression', () => {
    mother.children = [FixtureFactory.createPerson('A', 1), mother];

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
        new Book('A tale'),
        new Book('A tale'),
        new Book('Biography'),
        new Book('Some light thriller'),
      ];
      library.writers[1].books = [new Book('Biography'), new Book('A tale')];
      library.writers[2].books = [
        new Book('Biography'),
        new Book('A tale'),
        new Book('Cookbook for Cakes'),
        new Book('Cookbook for Cookies'),
        new Book('Cookbook for Vegetables'),
      ];
      library.writers[0].books[3].awards = ['Spiegel Bestseller'];
      library.writers[1].books[1].awards = ['Best New Author', 'Spiegel Bestseller'];
      library.writers[2].books[2].awards = ['Pulitzer Prize', 'Spiegel Bestseller'];
    });

    it('should handle nested collection expressions with variables correctly', () => {
      let oclExpression = 'context Library inv: self.writers->forAll(w | w.books->exists(b | b.title = "Biography"))';
      expectOclRuleValidatesToTrue(oclExpression, library);

      oclExpression = 'context Library inv: self.writers->forAll(w | w.books->one(b | b.title = "Biography"))';
      expectOclRuleValidatesToTrue(oclExpression, library);

      oclExpression = 'context Library inv: self.writers->forAll(w | w.books->one(b | b.title = "A tale"))';
      expectOclRuleValidatesToFalse(oclExpression, library);
    });

    it('should handle nested collection expressions without variables correctly', () => {
      let oclExpression = 'context Library inv: self.writers->forAll(w | w.books->exists(title = "Biography"))';
      expectOclRuleValidatesToTrue(oclExpression, library);

      oclExpression = 'context Library inv: self.writers->forAll(w | w.books->one(title = "Biography"))';
      expectOclRuleValidatesToTrue(oclExpression, library);

      oclExpression = 'context Library inv: self.writers->forAll(w | w.books->one(title = "A tale"))';
      expectOclRuleValidatesToFalse(oclExpression, library);
    });

    it('should handle double nested collection expressions correctly', () => {
      let oclExpression =
        'context Library inv: self.writers->forAll(w | w.books->exists(b | b.awards->exists(a | a = "Spiegel Bestseller")))';
      expectOclRuleValidatesToTrue(oclExpression, library);

      oclExpression =
        'context Library inv: self.writers->forAll(w | w.books->exists(b | b.awards->exists(a | a = "Pulitzer Prize")))';
      expectOclRuleValidatesToFalse(oclExpression, library);
    });
  });
});
