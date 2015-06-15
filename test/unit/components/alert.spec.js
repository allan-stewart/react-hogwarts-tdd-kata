import {expect, assert} from 'chai';
import React from 'react/addons';

import Alert from '../../../src/components/alert';


var TestUtils = React.addons.TestUtils;

describe('Alert component', () => {

  it('renders text', () => {
    var catalog = TestUtils.renderIntoDocument(
      <Alert message="salve mundi"/>
    );
    var data = TestUtils.findRenderedDOMComponentWithTag(catalog, 'div');
    expect(data.getDOMNode().textContent).to.equal("salve mundi");
  });

  it('renders nothing when no message', () => {
    var catalog = TestUtils.renderIntoDocument(
      <Alert message=""/>
    );
    var data = TestUtils.scryRenderedDOMComponentsWithTag(catalog, 'div');
    expect(data).to.have.length(0);
  });

  it("sets class to 'alert-danger' on error", () => {
    var catalog = TestUtils.renderIntoDocument(
      <Alert message="error" error />
    );
    var data = TestUtils.scryRenderedDOMComponentsWithClass(catalog, 'alert-danger');
    expect(data).to.have.length(1);
  });

  it("sets class to 'alert-success' with no error", () => {
    var catalog = TestUtils.renderIntoDocument(
      <Alert message="error" />
    );
    var data = TestUtils.scryRenderedDOMComponentsWithClass(catalog, 'alert-success');
    expect(data).to.have.length(1);
  });

});
