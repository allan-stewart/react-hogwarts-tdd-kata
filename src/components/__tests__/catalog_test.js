jest.dontMock('../catalog.js');

import React from 'react/addons';
import Catalog from "../catalog";

var TestUtils = React.addons.TestUtils;

describe('catalog component', function() {

  it('renders properly', () => {
    //<Catalog state={state} />
    var catalog = TestUtils.renderIntoDocument(
      <Catalog />
    );

    var titles = TestUtils.scryRenderedDOMComponentsWithTag(catalog, 'th');

    //expect(title[0].getDOMNode().textContent).toEqual('Class');
    //expect(carts.length).toBe(1);
    //expect(carts[0].props).toEqual({
      //cart: state.cart
    //});
  });

});


