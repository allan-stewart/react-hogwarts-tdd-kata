React Hogwarts TDD Refactoring Kata
===================================

“You are here to learn the subtle science and exact art of code-crafting. As there is little foolish wand-waving here, many of you will hardly believe this is magic." --Professor Snape

Introduction
------------

Hogwarts has embraced Muggle Technology!

Professor Arthur Weasley has just discovered the magic-powered computer, Hex, and it works at Hogwarts.

---

Young Wizard, you will be creating Hogwart's online student registration. Professor Neville Longbottom will guide you.

Because you are a highly disciplined Wizard, you will be writing your code test first.

Setup
-----

You have [git](http://git-scm.com/downloads) installed.

``git clone https://github.com/zhon/react-hogwarts-tdd-kata.git``

``cd react-hogwarts-tdd-kata``
``npm install``
``npm start``

Visit ``localhost:3000`` to see the code running.

TODO run tests?



## 1. Story: Show Course Catalog

Acceptance: Students will be able to see a catalog of courses.

---

It is time to start coding. Where will you start? **Making changes to catalog UI inside file ``src/components/catalog.js``.**

I seem to have forgotten how to view the catalog.
**Oh, Professor, you just refresh ``app/index.html`` and click on the Catalog menu.**

### 1.0. UI For Course Catalog

How do we want the catalog to look? **We will put it into a table with headers course name, prof...**

Can you show me in a test? **Oh, that would be easier.**

```js
  it('renders html headers', () => {
    var catalog = TestUtils.renderIntoDocument(
      <Catalog />
    );
    var titles = TestUtils.scryRenderedDOMComponentsWithTag(catalog, 'th');
    should(titles[0].getDOMNode().textContent).be.equal('Class');
    should(titles[1].getDOMNode().textContent).be.equal('Professor');
    should(titles[2].getDOMNode().textContent).be.equal('Credits');
    should(titles[3].getDOMNode().textContent).be.equal('Time');
  });
```

I see you expect to have a ``Catalog`` component with headers. **Yes, I expect we want to show "Class", "Professor", "Credits" and "Time".**





I reloaded ``app/index.html`` and clicked on menu item catalog and I don't see anything. **It is because we haven't hooked it up.**

How will you hook it up? **By loading the ``scope`` with all the courses when the Controller is initialized.**

### 1.1. Make Test Error

Can you show me what you mean? **Sure.**

**Demonstratio Facilius.**

``test/catalog/catalog-controller-specs.js``
```js

describe('CatalogController', function () {

    describe('when the controller first loads', function () {

        it('the course catalog is retrieved', function () {
            sinon.assert.calledOnce(mockCatalogRepository.getCatalog);
        });

    });

});
```

Very nice, you wrote the description and the expectation first. **Thank you. Keeping the test simple helps my thinking.**

What happens if you run it? **It will generate errors. You can see them by reloading your tests (``test/HogwartsTests.hmtl`` in browser or looking at your CLI karma results).**

What is the meaning of: "mockCatalogRepository is not defined"? **It means my mockCatalogRepository is not setup -- I'm referencing it in my test before I even declare it.**

### 1.1. Make Test Fail

What's the first step? **Declare the mockCatalogRepository.**

Yes, and then? **I'm not sure.**

Do you remember how to cast the Dependency Injection spell? **I remember now.**

**Accio Dependentiam Injecious**

``test/catalog/catalog-controller-specs.js``
```js
...

describe('CatalogController', function () {

    var mockCatalogRepository,
        scope,
        catalog = ["catalog"];

    beforeEach(function () {
        module("hogwartsApp");

        inject(function ($rootScope, $controller, catalogRepository) {
            scope = $rootScope.$new();

            mockCatalogRepository = sinon.stub(catalogRepository);
            mockCatalogRepository.getCatalog.returns(catalog);

            $controller("CatalogController", {
                $scope: scope,
                catalogRepository: mockCatalogRepository
            });
        });
    });

    describe('when the controller first loads', function () {

...
```

Does it pass now? **No, but it is not erroring. I think we are making progress? We are seeing a failing test (expected getCatalog to be called once but was called 0 times).**

You are on the path to enlightenment. It is wise to celebrate any failure that doesn't kill you. **Yeah!???**

What are you doing inside ``beforeEach``? **We are creating a mock repository and a temporary scope. We then inject the mocks into the ``CatalogController``.**

### 1.1. Make Test Pass

How do you make it pass? **The test says the CatalogController needs to call getCatalog on the repository when CatalogController is initialized.**


``app/catalog/catalog-controller.js``
```js

'use strict';

hogwartsApp
.controller("CatalogController", function ($scope, catalogRepository) {
    catalogRepository.getCatalog();
});
```

Is it passing? **Yes!**

### 1.1. Refactor

Put this into your Remembrall: Whenever tests are passing, time for refactoring. **I don't see anything that needs refactoring.**

### 1.2. Failing

You have completed your first test. One point for Hufflepuff. Is the story complete? **No, the catalog does not show up on the web page. The ``catalog.html`` UI expects an property called ``catalog`` on the scope. I can do that!**

Ahem. You can write a test for that? **Oh, yes, that's what I meant.**

**Etiam Dolor Scopus**

``test/catalog/catalog-controller-specs.js``
```js
...

    describe('when the controller first loads', function () {

        ...

        it('puts the catalog on the scope', function() {
            expect(scope.catalog).toEqual(catalog);
        });

        ...
```

### 1.2. Passing

``catalog/catalog-controller.js``
```js
...

.controller("CatalogController", function ($scope, catalogRepository) {
    $scope.catalog = catalogRepository.getCatalog();
});
```

Are we finished with the story? **No, Professor Longbottom. Before calling a story done, it must be tested and deployed.**

But this is only a Kata, we will start on the real work next week when you have a pair. **Ok, I won't deploy it and I won't write automated acceptance tests. But I must inspect my beautiful work (and make sure it is working).**

### 1.9. End to End

You can see it by loading ``app/index.html`` into your browser and clicking on Catalog (at the top). **I am seeing the page now.**

Well done, young Wizard. You have finished your story. Another point for Hufflepuff. **Thank you, I like the write the test, see it fail, write code to make it pass, and then refactor rhythm. I also like seeing what the end user sees.**

