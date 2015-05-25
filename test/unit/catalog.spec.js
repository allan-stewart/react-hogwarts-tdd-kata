import should from 'should';
import React from 'react/addons';

import Catalog from '../../src/components/catalog'


var TestUtils = React.addons.TestUtils;

describe('catalog component', function() {

  it('renders headers', () => {
    //<Catalog state={state} />
    var catalog = TestUtils.renderIntoDocument(
      <Catalog />
    );
    var titles = TestUtils.scryRenderedDOMComponentsWithTag(catalog, 'th');
    should(titles[0].getDOMNode().textContent).be.equal('Class');
    should(titles[1].getDOMNode().textContent).be.equal('Time');
    should(titles[2].getDOMNode().textContent).be.equal('Professor');
    should(titles[3].getDOMNode().textContent).be.equal('Credits');
  });

  it('renders data', () => {
    //<Catalog state={state} />
    var catalog = TestUtils.renderIntoDocument(
      <Catalog />
    );
    var body = TestUtils.findRenderedDOMComponentWithTag(catalog, 'tbody');
    console.log(body.getDOMNode().textContent)
    //should(titles[0].getDOMNode().textContent).be.equal('Class');
    //should(titles[1].getDOMNode().textContent).be.equal('Time');
    //should(titles[2].getDOMNode().textContent).be.equal('Professor');
    //should(titles[3].getDOMNode().textContent).be.equal('Credits');
  });

});

