import should from 'should';
import React from 'react/addons';
import sinon from 'sinon';

import Catalog from '../../src/components/catalog'
import Course from '../../src/components/course'

import mockComponent from "../utils/mock-component";


var TestUtils = React.addons.TestUtils;

describe('catalog component', function() {

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

  it('renders course', () => {
    var catalog = TestUtils.renderIntoDocument(
      <Catalog />
    );
    catalog.setState({catalog: [
      {id: "RUN105", name: "Ancient Runes", startTime: new Date(0,0,0,13), professor: "Bathsheba Babbling", credits: 3 }
    ]});
    var courseData = TestUtils.scryRenderedComponentsWithType(catalog, Course);
    courseData[0].props.course.id.should.equal("RUN105");
  });

  it('renders all courses', () => {
    var catalog = TestUtils.renderIntoDocument(
      <Catalog />
    );
    catalog.setState({catalog: [
      {id: "RUN105", name: "Ancient Runes", startTime: new Date(0,0,0,13), professor: "Bathsheba Babbling", credits: 3 },
      {id: "AST101", name: "Astronomy", startTime: new Date(0,0,0, 11), professor: "Aurora Sinistra", credits: 3 },
      {id: "DDA302-10", name: "Defence Against the Dark Arts", startTime: new Date(0,0,0,10), professor: "Severus Snape", credits: 4 },
    ]});
    var courseData = TestUtils.scryRenderedComponentsWithType(catalog, Course);
    courseData[0].props.course.id.should.equal("RUN105");
    courseData[1].props.course.id.should.equal("AST101");
    courseData[2].props.course.id.should.equal("DDA302-10");
  });

  it('renders course with key assigned to course.id', () => {
    var catalog = TestUtils.renderIntoDocument(
      <Catalog />
    );
    catalog.setState({catalog: [
      {id: "RUN105", name: "Ancient Runes", startTime: new Date(0,0,0,13), professor: "Bathsheba Babbling", credits: 3 }
    ]});
    var courseData = TestUtils.scryRenderedDOMComponentsWithTag(catalog, "tbody");
    courseData[0].props.children[0].key.should.equal("RUN105");
  });

  describe('with mocked course', () => {

    var mockCourse;
    before( () => {
    //var mockCourse = mockComponent(Course);
    });

    after(() => {
      // unmock everything we mocked
    });

  })

});
