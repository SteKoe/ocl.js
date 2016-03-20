## OCL.js
The Object Constraint Language (OCL) is a language for describing rules that apply to MOF conform modelling languages like UML.
The OCL is a text based language that provides constraint and object query expressions that cannot be expressed by a meta modelling language.

## Supported concepts
This package does not fully conform to the OCL definition by OMG and implements a subset of the given concepts.

### Invariants
The current implementation supports invariants and constraints as follows.

#### =, <>, >, <, <=, >=
Start time of a meeting has to be before end time
``` ocl
context Meeting inv:
    self.end > self.start
```

A lecture hat to have a lecturer
``` ocl
context Lecture inv:
    self.lecturer <> nil
```

#### implies
If a person has children, the flag "isParent" has to be true
``` ocl
context Person inv:
    self.children <> nil implies self.isParent = true
```

#### isEmpty(), isNotEmpty()
If a person has children, the flag "isParent" has to be true
``` ocl
context Person inv:
    self.children->isNotEmpty() implies self.isParent = true
```

If a person does not have any children, the person is not a parent
``` ocl
context Person inv:
    self.children->isEmpty() implies self.isParent = false
```

#### forAll
If a person has children, all children have to be younger than the parent.
``` ocl
context Person inv:
    self.children->forAll(c|c.age < self.age)
```
A person's children have to have distinguishable names:
``` ocl
context Person inv:
    self.children->forAll(c1, c2 | c1.name <> c2.name)
```

#### select
Select all children from collection who are younger than 10 years old:
``` ocl
context Person inv:
    self.children->select(c | c.age < 10)
```

#### exists
Check if an element in a collection exists:
``` ocl
context Person inv:
    self.children->exists(c | c.age > 18)
```

#### or, and
Concatenation of expressions using or/and:
``` ocl
context MetaAttribute inv:
    self.minCard <= self.maxCard or (self.minCard = nil and self.maxCard = nil)
```