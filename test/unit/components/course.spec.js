import {expect} from 'chai';
import React from 'react/addons';

import Course from '../../../src/components/course'


var TestUtils = React.addons.TestUtils;

describe('course component', () => {

  let course = {
    name: "DADA",
    professor: "Quirinus Quirrell",
    credits: "3",
    startTime: new Date(0, 0, 0, 11, 30),
  };

  it('renders', () => {
    var renderedCourse = TestUtils.renderIntoDocument(
      <table>
        <tbody>
          <Course course={course}/>
        </tbody>
      </table>
    );
    var data = TestUtils.scryRenderedDOMComponentsWithTag(renderedCourse, "td");
    expect(data.length).equal(4);
    expect(data[0].getDOMNode().textContent).be.equal("DADA");
    expect(data[1].getDOMNode().textContent).be.equal("Quirinus Quirrell");
    expect(data[2].getDOMNode().textContent).be.equal("3");
  });

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

  it('renders nothing if no course is supplied', () => {
    var renderedCourse = TestUtils.renderIntoDocument(
      <table>
        <tbody>
          <Course />
        </tbody>
      </table>
    );
    var data = TestUtils.scryRenderedDOMComponentsWithTag(renderedCourse, 'td');
    expect(data.length).be.equal(0);
  });

  it('renders the Register link when props.onRegister is supplied', () => {
    var onRegister = function () {};
    var renderedCourse = TestUtils.renderIntoDocument(
      <table>
        <tbody>
          <Course course={course} onRegister={onRegister} />
        </tbody>
      </table>
    );
    var data = TestUtils.scryRenderedDOMComponentsWithTag(renderedCourse, "td");
    expect(data.length).be.equal(5);
    expect(data[4].getDOMNode().textContent).be.equal("Register");
    expect(data[4].props.children.type).equal("a");
  });

  it('should call onRegister when the link is clicked', () => {
    var clickedCourse = null;
    var onRegister = function (registeredCourse) {
      clickedCourse = registeredCourse;
    };
    var renderedCourse = TestUtils.renderIntoDocument(
      <table>
        <tbody>
          <Course course={course} onRegister={onRegister} />
        </tbody>
      </table>
    );
    var data = TestUtils.scryRenderedDOMComponentsWithTag(renderedCourse, "a");
    TestUtils.Simulate.click(data[0]);
    expect(clickedCourse).equal(course);
  });

});
