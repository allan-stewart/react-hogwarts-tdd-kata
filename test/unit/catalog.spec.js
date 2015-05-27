import should from 'should';
import React from 'react/addons';
import rewire from 'rewire';
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

  describe('with mocked course', () => {
    var TestableCatalog = rewire('../../src/components/catalog');

    var mockCourse = mockComponent(Course);
    before( () => {
      TestableCatalog.__set__('Course', mockCourse);
    });

    after(() => {
    });

    it('renders course', () => {
      var catalog = TestUtils.renderIntoDocument(
        <Catalog />
      );
      sinon.assert.calledOnce(mockCourse.render);
    });

    it('renders all courses', () => {
      //var catalog = TestUtils.renderIntoDocument(
        //<Catalog />
      //);
      //should(titles[3].getDOMNode().textContent).be.equal('Time');

    });

    it('renders course with key assigned to course.id', () => {

    });
  })

});

