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

Visit ``localhost:3000/index.html`` to see the code running.

To run the tests:

``npm test``
or
`` npm run test-watch``



## 1. Story: Show Course Catalog

Acceptance: Students will be able to see a catalog of courses.

---

It is time to start coding. Where will you start? **Making changes to catalog UI inside file ``src/components/catalog.js``.**

I seem to have forgotten how to view the catalog. **Oh, Professor, you just run ``npm start`` and hit webpage ``localhost:3000/index.html`` and click on the Catalog menu.**

### 1.0. Table Headers for Course Catalog

How do we want the catalog to look? **We will put it into a table with headers, class, profesor, cred...**

Can you show me in a test? **Oh, that would be easier.**

### 1.0.0. Failing

``test/unit/components/catalog.spec.js``
```js
  it('renders html headers', () => {
    var catalog = TestUtils.renderIntoDocument(
      <Catalog />
    );
    var titles = TestUtils.scryRenderedDOMComponentsWithTag(catalog, 'th');
    expect(titles[0].getDOMNode().textContent).be.equal('Class');
    expect(titles[1].getDOMNode().textContent).be.equal('Professor');
    expect(titles[2].getDOMNode().textContent).be.equal('Credits');
    expect(titles[3].getDOMNode().textContent).be.equal('Time');
  });
```

### 1.0.1. Passing

I see you expect to have a ``Catalog`` component with headers. **Yes, I expect we want to show "Class", "Professor", "Credits" and "Time".**

``src/components/catalog.js``
```js
  render() {
    return (
          <div className="panel panel-default" >
            <table className="table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Professor</th>
                  <th>Credits</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
    );
  }
```

I reloaded ``localhost:3000/index.html`` and clicked on menu item catalog and I don't see the list of courses. **It is because we haven't hooked them up. Also, professor, webpack makes it so you don't have to refresh the web page.**


### 1.1 Showing a Course

I see, we only have the headers. How will we add a course? **I think I will add a ``Course`` component inside the ``<tbody>`` tags and pass the a ``course`` as a property.**

Can you show me with a test? **Sure.**

**Demonstratio Facilius.**

### 1.1.0

``test/unit/components/catalog.spec.js``
```js
  it('renders a course', () => {
    var catalog = [ {
        id: "RUN105",
        name: "Ancient Runes",
        startTime: new Date(0,0,0,13),
        professor: "Bathsheba Babbling", credits: 3
     } ];
    var renderedCatalog = TestUtils.renderIntoDocument(
      <Catalog catalog={catalog}/>
    );
    var courses = TestUtils.scryRenderedDOMComponentsWithTag(renderedCatalog, 'td');
    expect(courses[0].getDOMNode().textContent).to.equal("Ancient Runes");
  });
```

### 1.1.1 Erroring
``src/components/catalog.js``
```js

  render() {
    var catalog = this.props.catalog;
    var course = catalog && (catalog.length > 0) ? catalog[0] : null;

      .
      .
      .

          <tbody>
            <Course course={course} />
```

Woah, now everything is broken. Nothing shows in the browser and the tests are failing. **Yes, it is because the course component is not defined. I will define it in ``src/components/course.js``**

### 1.1.2 Failing

``src/components/course.js``
```js
export default class Course extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return null;
  }
}
```

**Notice I remembered to import course into ``catalog.js``.**

``src/components/catalog.js``
```js

import Course from "./course";
```

### 1.1.3 Passing

Whew, now we have only one failing test. **Yes, professor and now I will make it pass.**

**Facere Transeat**

``src/components/course.js``
```js

  render() {
    var course = this.props.course;
    if (!course) {
      return null;
    }
    return (
      <tr>
        <td>{course.name}</td>
        <td>{course.professor}</td>
        <td>{course.credits}</td>
        <td>{course.startTime}</td>
      </tr>
    );
  }
```

### 1.1.4 End to END for Showing the Catalog

You have build a perfectly good catalog! **Thank you.**

When I look at the catalog web page, why don't I see the classes? **It is because ``Catalog`` is a stateless component (it only uses ``props``). We need a place to manage ``state``.**

What are you going to call this state managing component? **What about ``CatalogPage``?**

It turns out we have a ``CatalogPage``. Now what? **I will change ``CatalogPage.render`` to pass catalog to as a property.**

``src/components/catalog-page.js``
```js
  render() {
    return (
      <Catalog catalog={this.state.catalog}/>
    );
```

### 1.2 Show All Courses

I am only seeing one course. **Yeah, we coded it up that way.**

### 1.2.0 Failing

``test/unit/components/catalog.spec.js``
```js
  it('renders all courses', () => {
    var catalog = [ {
        id: "RUN105",
        name: "Ancient Runes",
        startTime: new Date(0,0,0,13),
        professor: "Bathsheba Babbling",
        credits: 3
      },{
        id: "AST101",
        name: "Astronomy",
        startTime: new Date(0,0,0, 11),
        professor: "Aurora Sinistra",
        credits: 3
      },{
        id: "DDA302-10",
        name: "Defence Against the Dark Arts",
        startTime: new Date(0,0,0,10),
        professor: "Severus Snape",
        credits: 4
      }
    ];

    var renderedCatalog = TestUtils.renderIntoDocument(
      <Catalog catalog={catalog}/>
    );

    var courses = TestUtils.scryRenderedDOMComponentsWithTag(renderedCatalog, 'tr');
    expect(courses).to.have.length(4); // 3 courses + 1 header
  });
```

### 1.2.1 Passing

**I added ``lodash``**

``src/components/catalog.js``
```
import React from "react";
import _ from "lodash";
```

**removed ``var course = ...``**


``src/components/catalog.js``
```js
  render() {
    var catalog = this.props.catalog;
    return (
```

and added ``_.map`` to ``Course``


``src/components/catalog.js``
```js
          <tbody>
            {
              _.map(catalog, item =>
                    <Course course={item} /> )
            }
          </tbody>
```

Very nice work! I see courses. **Thank you!**


### 1.3 Show Course Times

We seem to be missing the class start time. **I'll get right on it.**

### 1.3.0 Failing

``test/unit/course.spec.js``
```js
import React from 'react/addons';
import {expect} from 'chai';

import Course from '../../../src/components/course'


var TestUtils = React.addons.TestUtils;

describe('course component', () => {

  let course = {
    name: "DADA",
    professor: "Quirinus Quirrell",
    credits: "3",
    startTime: new Date(0, 0, 0, 11, 30),
  };

  it('renders time correctly', () => {
    var renderedCourse = TestUtils.renderIntoDocument(
      <table>
        <tbody>
          <Course course={course}/>
        </tbody>
      </table>
    );
    var data = TestUtils.scryRenderedDOMComponentsWithTag(renderedCourse, 'td');
    expect(data[3].getDOMNode().textContent).be.equal('11:30 am');
  });

});
```

### 1.3.1 Passing

**I am adding ``moment.js`` and replacing ``<td>{course.startTime}</td>``**

``src/components/catalog-page.js``
```js
import moment from "moment";
.
.
.

        <td>{course.credits}</td>
        <td>{moment(course.startTime).format("h:mm a")}</td>
```



STOP CODING!! (Everything below is from angular hogwarts kata)
--------------------


Very nice, you wrote the description and the expectation first. **Thank you. Keeping the test simple helps my thinking.**

What happens if you run it? **It will generate errors. You can see them by reloading your tests (``test/HogwartsTests.hmtl`` in browser or looking at your CLI karma results).**


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

Well done, young Wizard. You have finished your story. Another point for Hufflepuff. **Thank you, I like to 1) write the test, 2) see it fail, 3) write code to make it pass, and then 4) refactor. I also like seeing what the end user sees.**


## Story 2: Register for Courses

Existing code for this story:

* Wizard store
* Schedule component already listening to Wizard store
* Wizard actions w/ Malfoy code.

Expected flow for this story:

* Create tests for adding a register link on the Course component which should only show when an onRegister prop is passed in.
* Implement the register link
* Create tests for adding the onRegister prop to the Courses on the Catalog component
* Implement the onRegister prop
* From the page, attempt to register for a course and discover the "pure-blood" error.
* Investigate the registerForCourse() method of the wizard actions.
* Add tests and refactor the messy method.
* See the course registration working correctly.
