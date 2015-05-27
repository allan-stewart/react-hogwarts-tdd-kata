Intorduction to class
---------------------
State the object of the class
- Explain a Kata
- Why do Katas?
- This Kata is more complex than most TDD or Refactoring Kata because we want to pratice on a full stack.
- Somethings you might see as you pratice include the TDD rythymm and how to refactor smelly code.

Willem Thoughts
---------------
Add social experience
overhead projector
thoughts from students

hogwarts computer lab

tell them how to accordian works
 copycat

 Users can 
  -Copycat along with me
  -Read text headings first, guess tests and code, and then aftewards check in to see what the correct answers were
  -A mix of both

Bight sized pieces


Help people figure out what level

Server
------
JSON-server

Client
------
alt
react
webpack
lodash

Testing
-------
Moca/Should
Sinon

JSDom vs Karma (Dom testing)


Places to have bad code
-----------------------
Story 2




Gotchas
------------

## ES6 Imports/Exports

I was getting React failures when trying to
    `import Course from "./src/components/course";`
when the Course was defined like
    `class Course extends React.Component`
or
    `export class Course extends React.Component`

To make it work, I had to do
    `export default class Course extends React.Component`

Or apparently you can just do
    `export class Course extends React.Component`
but then you must change the import to be
    `class { Course } extends React.Component`

This website was helpful: http://www.2ality.com/2014/09/es6-modules-final.html
