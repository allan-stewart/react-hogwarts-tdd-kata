import should from 'should';
import React from 'react/addons';

import Catalog from '../../src/components/catalog'

import mockComponent from "../utils/mock-component";


var TestUtils = React.addons.TestUtils;

describe('catalog component', function() {

  it('renders html headers', () => {
    //<Catalog state={state} />
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
    // use rewire and mockcomponent
    //<Catalog state={state} />
    var catalog = TestUtils.renderIntoDocument(
      <Catalog />
    );
    // assert catalog was called
  });

  it('renders all courses', () => {

  });

  it('renders course with key assigned to course.id', () => {

  });

});

