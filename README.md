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

```
cd react-hogwarts-tdd-kata``
npm install
npm start
```

Visit ``localhost:3000/index.html`` to see the code running.

To run the tests:

``npm test``
or
`` npm run test-watch``

## 0. Coming up to Speed

How will you begin, my young wizard friend?
  2. **I will notice tests running in one ``console``.**
  2. **I will notice the server running in another ``console``.**
  1. **I will load http://localhost:3000/index.html.**
  3. **I will notice the three menu items.**
  4. **I will sort myself into a house by clicking on the sorting hat.**

Great, what house are you in? **I am in ___________________**

## 1. Story: Show Catalog

Acceptance: Students will be able to see a catalog of courses.

---

It is time to start coding. Where will you start? **Making changes to catalog UI inside file ``src/components/catalog.js``.**

I seem to have forgotten how to view the catalog. **Oh, Professor, you just run ``npm start`` and hit webpage ``localhost:3000/index.html`` and click on the Catalog menu.**

### 1.0. Table Headers for Catalog

How do we want the catalog to look? **We will put it into a table with headers, class, profesor, cred...**

Can you show me in a test? **Oh, that would be easier.**

### 1.0.0. Fail (Red)

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

### 1.0.1. Pass (Green)

I see you expect to have a ``Catalog`` component with headers. **Yes, I expect we want to show "Class", "Professor", "Credits" and "Time".**

``src/components/catalog.js``
```js
  render() {
    return (
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
    );
  }
```

I reloaded ``localhost:3000/index.html`` and clicked on menu item catalog and I don't see the list of courses. **It is because we haven't hooked them up. Also, professor, webpack makes it so you don't have to refresh the web page.**


### 1.1. Show a Course

I see, we only have the headers. How will we add a course? **I think I will add a ``Course`` component inside the ``<tbody>`` tags and pass ``course`` as a property.**

Can you show me with a test? **Sure.**

**Demonstratio Facilius.**

### 1.1.0. Fail

``test/unit/components/catalog.spec.js``
```js
  it('renders a course', () => {
    var catalog = [ {
        id: "RUN105",
        name: "Ancient Runes",
        startTime: new Date(0,0,0,11,30),
        professor: "Bathsheba Babbling",
        credits: 3
     } ];
    var renderedCatalog = TestUtils.renderIntoDocument(
      <Catalog catalog={catalog}/>
    );
    var courses = TestUtils.scryRenderedDOMComponentsWithTag(renderedCatalog, 'td');
    expect(courses[0].getDOMNode().textContent).to.equal("Ancient Runes");
  });
```

### 1.1.1. Error
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

### 1.1.2. Fail

``src/components/course.js``
```js
import React from "react";

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

### 1.1.3. Pass

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

### 1.1.4. Show the Catalog

You have build a perfectly good catalog! **Thank you.**

When I look at the catalog web page, why don't I see the classes? **It is because ``Catalog`` is a stateless component (it only uses ``props``). We need a place to manage ``state``.**

What are you going to call this state managing component? **What about ``CatalogPage``?**

It turns out we have a ``CatalogPage``. Now what? **I will change ``CatalogPage.render`` to pass catalog as a property.**

``src/components/catalog-page.js``
```js
  render() {
    ...
    return (
      ...
          <div className="panel panel-default" >
            <Catalog catalog={this.state.catalog}/>
          </div>
      ...
    );
  }
```

### 1.1.5. Refactor
It seems you have a test in the wrong place. **Yes, I have a ``Course`` tests mixed in with ``Catalog`` tests. I will move that now.**

**I am removing**

```js
  it('renders a course', () => {
    .
    .
    .
  });
```
**from**
``test/unit/components/catalog.spec.js``
**and placing it into ``course.spec`` with a few modifications**

``test/unit/components/course.spec.js``
```js
import React from 'react/addons';
import {expect} from 'chai';

import Course from '../../../src/components/course'


var TestUtils = React.addons.TestUtils;

describe('course component', () => {

  let course = {
    id: "RUN105",
    name: "Ancient Runes",
    startTime: new Date(0,0,0,11,30),
    professor: "Bathsheba Babbling",
    credits: 3
  };

  it('renders a course', () => {
    var renderedComponent = TestUtils.renderIntoDocument(
      <table>
        <tbody>
          <Course course={course}/>
        </tbody>
      </table>
    );
    var courses = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, 'td');
    expect(courses[0].getDOMNode().textContent).to.equal("Ancient Runes");
  });

});
```

What about ensuring ``Catalog`` contains a ``Course``? **I will add that test soon. ;-)**

### 1.2. Show All Courses

OK, now I am only seeing one course on the webpage. **Yeah, we coded it up that way. I'll fix it now.**

### 1.2.0. Fail

``test/unit/components/catalog.spec.js``
```js
import Course from '../../../src/components/course';
  .
  .
  .
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

    var courses = TestUtils.scryRenderedComponentsWithType(renderedCatalog, Course);
    expect(courses).to.have.length(3);
  });
```

### 1.2.1. Pass
How did you get it to pass?

**I added ``lodash``**

``src/components/catalog.js``
```
import React from "react";
import _ from "lodash";
```

**removed ~~``var course = ...``~~**


``src/components/catalog.js``
```js
  render() {
    var catalog = this.props.catalog;
    return (
```

**and added ``_.map`` to ``Course``**


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


### 1.3. Show Course Times

We seem to be missing the class start time. **I'll get right on it.**

### 1.3.0. Fail

``test/unit/components/course.spec.js``
```js
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
```

### 1.3.1. Pass

**I am adding ``moment.js`` and replacing ``<td>{course.startTime}</td>``**

``src/components/course.js``
```js
import moment from "moment";
.
.
.

        <td>{course.credits}</td>
        <td>{moment(course.startTime).format("h:mm a")}</td>
```

Are we finished with the story? **No, Professor Longbottom. Before calling a story done, it must be tested and deployed.**

But this is only a Kata, we will start on the real work registration system week when you have a pair. **Ok, I won't deploy it and I won't write automated acceptance tests. But I must inspect my beautiful work (and make sure it is working).**

### 1.9. Finish

Can you remind me how to see your work?

**``npm start``
``http://localhost:3000/index.html``
click on Catalog (at the top).**

Well done, young Wizard. You have finished your story. Another point for Hufflepuff. **Thank you, I like to 1) write the test, 2) see it fail, 3) write code to make it pass, and then 4) refactor. I also like seeing what the end user sees.**


## 2. Story: Register for Courses

Acceptance: Students register from the course catalog then view their courses on the schedule page.

---

### 2.0. Registration Link

You have shown how to build tested components that display data from a store. I would like to see some interaction. **Sure, how about we add a register link to the course listing?**

That works for now. Where will you start? **I will add the link to the course component.**

### 2.0.0. Fail

Don't you mean the course component spec? **Yes, Professor; this is a TDD Kata, after all.**

``test/unit/components/course.spec.js``
```js
  it('renders a register link', () => {
    var renderedCourse = TestUtils.renderIntoDocument(
      <table>
        <tbody>
          <Course course={course} />
        </tbody>
      </table>
    );
    var data = TestUtils.scryRenderedDOMComponentsWithTag(renderedCourse, "td");
    expect(data.length).be.equal(5);
    expect(data[4].getDOMNode().textContent).be.equal("Register");
    expect(data[4].props.children.type).equal("a");
  });
```

### 2.0.1. Pass

**Now I will make the test pass.**

``src/components/course.js``
```js
  render() {
    ...
    <tr>
      ...
      <td><a href="#">Register</a></td>
    </tr>
  }
```

### 2.1. Invoke an Action

Excellent. I see the "Register" link on the page now. But it doesn't do anything when I click on it. **No Professor, we haven't added an ``onClick`` event.**

What should happen when the link is clicked? **We should call an action which will register the course to the wizard using the site.**

Correct. There is already a ``wizard-actions`` file for that. But how will you test that the correct action is called? **I will use a mocking spell.**

### 2.1.0. Fail

**Mockus expectramis**

``test/unit/components/course.spec.js``
```js
import sinon from 'sinon';
import WizardActions from '../../../src/actions/wizard-actions';

...

  it('calls WizardActions.registerForCourse when the register link is clicked', () => {
    var mockWizardActions = sinon.mock(WizardActions);
    mockWizardActions.expects("registerForCourse").once().withExactArgs(course);
    var renderedCourse = TestUtils.renderIntoDocument(
      <table>
        <tbody>
          <Course course={course} />
        </tbody>
      </table>
    );
    var data = TestUtils.scryRenderedDOMComponentsWithTag(renderedCourse, "a");
    TestUtils.Simulate.click(data[0]);
    mockWizardActions.verify();
  });
```

Very good. I see you have used the `sinon` library to create a mock version of the wizard actions.

### 2.1.1. Pass

**Now to make the test pass.**

``src/components/course.js``
```js
import WizardActions from "../actions/wizard-actions";

export default class Course extends React.Component {
  ...
  handleRegisterClick(event) {
    event.preventDefault();
    WizardActions.registerForCourse(this.props.course);
  }
  ...
      <td><a href="#" onClick={this.handleRegisterClick.bind(this)}>Register</a></td>
```

### 2.2. Displaying Registered Courses

Good work. Now we should be able click the register link and see the course show up on the schedule webpage. **Hey! I get an error on the page that says, "Wizard pure-blood requirements not met." That's discrimination! Sure, only one of my parents was a wizard, but--**

### 2.2.1. Investigation

Yes, yes, you're right. Calm down; that error shouldn't be there. We'd better check the ``src/actions/wizard-actions`` code. **I see that error message in the ``registerForCourse`` method. But it's hard to understand what's going on in that code.**

Indeed. Malf-- that is, the wizard who worked on this project didn't write very clean code. Let's see if there are any tests. **I see some tests in ``test/unit/actions/wizard-actions.spec.js``**

What does the registerForCourse test tell you? **It looks like when you register for a course, it is supposed to update the wizard repository and then dispatch two events: ``registerForCourseSuccess`` and ``updateWizard``**

That sounds correct. Are there any tests for the error message behavior? **No.**

Since we have a passing test, we should refactor the ``wizard-actions`` file so we can figure out what's going on.

### 2.2.2. Refactoring: Rename Variables

Can you figure out what any of those variables are for? **Yes. The ``c`` variable passed into the function must be the course we are registering for. And the ``w`` variable is assigned to the wizard data we get back from the repository. I will rename them to make it easier to understand the code.**

**Nomer changus**

``src/actions/wizard-actions.js``
```js
  registerForCourse(course) {
    var chk = (x) => { return x.house; };
    var advi = 4;
    var wizard = WizardRepository.get();
    var h = chk(wizard);
    var adv = "h";
    // Check for mudbloods.
    if (h[2] !== "y") {
      return this.actions.registerForCourseFailed("Wizard pure-blood requirements not met.");
    }
    wizard.courses.push(course);
    if (h[advi] === adv) {
      // DO NOT REMOVE!
      course.credits++;
    }
    WizardRepository.save(wizard);
    this.actions.registerForCourseSuccess(course);
    this.actions.updateWizard(wizard);
  }
```

Good. How about the ``h`` variable? What is it for? **Well, ``h`` is assigned to the result of ``chk(wizard)`` which returns the wizard's house name. So I can cast the rename variable spell again.**

``src/actions/wizard-actions.js``
```js
  registerForCourse(course) {
    var chk = (x) => { return x.house; };
    var advi = 4;
    var wizard = WizardRepository.get();
    var house = chk(wizard);
    var adv = "h";
    // Check for mudbloods.
    if (house[2] !== "y") {
      return this.actions.registerForCourseFailed("Wizard pure-blood requirements not met.");
    }
    wizard.courses.push(course);
    if (house[advi] === adv) {
      // DO NOT REMOVE!
      course.credits++;
    }
    WizardRepository.save(wizard);
    this.actions.registerForCourseSuccess(course);
    this.actions.updateWizard(wizard);
  }
```

I see that your tests are still green. Very good. This means you haven't broken anything while making the code easier to read. **Thank you. But I can't figure out what ``advi`` or ``adv`` are for.**

### 2.2.3. Refactoring: Inline Variables

Those two mystery variables only appear to be used once each. Since the names aren't helpful, you can try replacing the variables with the values. **Yes, I see. We can do something similar with the ``chk`` function. We don't need a separate variable to track the wizard's house.**

**Variate inlinus**

``src/actions/wizard-actions.js``
```js
  registerForCourse(course) {
    var wizard = WizardRepository.get();
    // Check for mudbloods.
    if (wizard.house[2] !== "y") {
      return this.actions.registerForCourseFailed("Wizard pure-blood requirements not met.");
    }
    wizard.courses.push(course);
    if (wizard.house[4] === "h") {
      // DO NOT REMOVE!
      course.credits++;
    }
    WizardRepository.save(wizard);
    this.actions.registerForCourseSuccess(course);
    this.actions.updateWizard(wizard);
  }
```

### 2.2.4. Refactoring: Tests Expose Bugs

Now we're getting somewhere. It appears that Dra-- I mean, the other developer was looking at specific characters in the name of the houses. **Very crafty. Instead of checking for "Slytherin", he is just looking for the "y" at index 2.**

Gryffindor also has a "y" at index 2, you know. **But Hufflepuff and Ravenclaw do not.**

There is not supposed to be any kind of pure-blood requirement for registering for courses at Hogwarts. **I'll just delete those lines.**

Wait. It's always better to use a test to expose a bug. That's something to put into your Remembrall. **Okay, I'll change the existing test. The specific house shouldn't matter, so I'll just change that in the test.**

``test/unit/actions/wizard-actions.spec.js``
```js
it('invokes registerForCourseSuccess and updateWizard on success', (done) => {
  var wizard = {house: '', courses: []};
  ...
});
```

Very good. Now you can fix the code. **And I'll get rid of that offensive "mudblood" comment too.**

``src/actions/wizard-actions.js``
```js
  registerForCourse(course) {
    var wizard = WizardRepository.get();
    wizard.courses.push(course);
    if (wizard.house[4] === "h") {
      // DO NOT REMOVE!
      course.credits++;
    }
    WizardRepository.save(wizard);
    this.actions.registerForCourseSuccess(course);
    this.actions.updateWizard(wizard);
  }
```

### 2.2.5. Refactoring: Clean Code

**Now when I click on the register link on the webpage, I get a success message! And the course shows up on the schedule page too.**

Good. But you aren't done here. To keep code maintainable, you should follow the "Wizard Scout Rule" and leave the place cleaner than you found it. **Ah yes. There is still that bit of code that is checking the house and adding additional credits. But it says "DO NOT REMOVE" in all capitals. It sounds important.**

Comments can be misleading. There is no requirement for giving certain houses more credit for a course. **Very well, I will expose the bug and fix it.**

Are you sure you want to write a test for a case that shouldn't exist? **Good point. I'll just remove that code then.**

``src/actions/wizard-actions.js``
```js
  registerForCourse(course) {
    var wizard = WizardRepository.get();
    wizard.courses.push(course);
    WizardRepository.save(wizard);
    this.actions.registerForCourseSuccess(course);
    this.actions.updateWizard(wizard);
  }
```

### 2.9. Finish

Clicking on the register link now results in a success message and the course appears on the schedule page. Are we finished with this story? **It depends, should we disallow scheduling more than one course at the same time (unless they have a Time-Turner)?**

Yes, but that is another story. **Then, the software works as expected. The code is clean. Yes, I would say this story is done.**

Congratulations, two points for Hufflepuff. Now, as soon as I get this Leg-Locker Curse off, we can go to the Quidditch match.

## 3. Story: Hat Sorts Randomly

Acceptance: Clicking multiple times will result in all houses being selected.

---

We have a disaster! Sorting Hat is celebrating at Hogsmeade with Nymphadora Tonks' ghost and refuses to come home. The replacement, the old straw thing that sorted you, is sorting everything according to this Kata! **I am not sure I see the problem.**

Everyone is being sorted into _Hufflepuff_! **Oh, no!, I could have been in Gryffindor! What can we do?**

We must change the Kata immediately to sort randomly.  **I am on it.**

### 3.1.0. Debug


How will you find the bug? **I could open the debugger and...**

You have tests, why not use them to help locate the bug? **I am not sure how.**

The sorting code has to be located in the ``store``, the ``action`` or the ``component``. Rarely would someone put it in the component. Most likely it is in the actions. **Hmm, I found it in the ``SortingStore``, but how will writing test help avoid the debugger?**

Is there a test for ``SortingStore``? **No, I just see an empty file ``test/unit/stores/sorting-store.spec.js``.**

Missing tests are common bug locations. Sometime, you might have a test file but the test is missing. Code coverage tools can help you find missing tests. **Good to know.**

You now have a choice, _write a test_ or open the _debugger_. **I choose test (this is a TDD Kata after all).**

### 3.1.1. Fail


``test/unit/actions/wizard-actions.spec.js``
```js
    describe('when generating a random number', function () {
      var stubMath;

      beforeEach(function () {
        stubMath = sinon.stub(Math, 'random');
      });

      afterEach(function () {
        stubMath.restore();
      });

      it ('saves Gryffindor for random range 0.0 - 0.249', function() {
        stubMath.returns(0.249);
        mockWizardRepository.expects('save').once().withArgs(sinon.match({house: "Gryffindor"}));
        WizardActions.sortIntoHouse();
        mockWizardRepository.verify();
      });

      it ('saves Slytherin for random range 0.25 - 0.49', function() {
        stubMath.returns(0.49);
        WizardActions.sortIntoHouse();
        mockWizardRepository.expects('save').once().withArgs(sinon.match({house: "Slytherin"}));
      });

      it ('saves Ravenclaw for random range 0.5 - 0.749', function() {
        stubMath.returns(0.749);
        WizardActions.sortIntoHouse();
        mockWizardRepository.expects('save').once().withArgs(sinon.match({house: "Ravenclaw"}));
      });

      it ('saves Hufflepuff for random range 0.75 - 1', function() {
        stubMath.returns(0.99);
        WizardActions.sortIntoHouse();
        mockWizardRepository.expects('save').once().withArgs(sinon.match({house: "Hufflepuff"}));
        mockWizardRepository.verify();

      });

    });

```

### 3.1.2. Passing

To get it to pass, I replace the return section with the correct algorithm (straight from Arithmancy class).

```js
    return Math.floor(Math.random() * (max - min + 1)) + min;
```

Nice work with the test coverage. **Thank you, Professor.**

### 3.9. End to End

Have you looked at the website? **Yes students are now being sorted into different houses.**

Excellent! Three points for Hufflepuff.


O.W.L.s and N.E.W.T.s
=====================

The Kata is officially over and Stinksap's not poisonous. If you are here with working code, you are awarded an _Acceptable_ OWL. If you want a NEWT or a higher grade, complete all of the following stories/tasks.

### 4. Disallow Registering for Multiple Simultaneous Classes

Acceptance: Students attempting to register for multiple classes at the same time will be shown a message saying this is not allowed and the second class will not be added to their schedule.

### 5. Allow Multiple Simultaneous Classes with  a Time-Turner

Acceptance: Students with a time-turner are allowed to register for multiple classes at the same time.

### 6. Refactor out the duplicated UI in Schedule and Catalog

