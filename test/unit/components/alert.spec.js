import {expect} from 'chai';
import React from 'react/addons';

import Alert from '../../../src/components/alert';


const TestUtils = React.addons.TestUtils;

describe('Alert component', () => {

  it('renders text', () => {
    const catalog = TestUtils.renderIntoDocument(
      <Alert message="salve mundi"/>
    );
    const data = TestUtils.findRenderedDOMComponentWithTag(catalog, 'div');
    expect(data.getDOMNode().textContent).to.equal('salve mundi');
  });

  it('renders nothing when no message', () => {
    const catalog = TestUtils.renderIntoDocument(
      <Alert message=""/>
    );
    const data = TestUtils.scryRenderedDOMComponentsWithTag(catalog, 'div');
    expect(data).to.have.length(0);
  });

  it('sets class to "alert-danger" on error', () => {
    const catalog = TestUtils.renderIntoDocument(
      <Alert message="error" error />
    );
    const data = TestUtils.scryRenderedDOMComponentsWithClass(catalog, 'alert-danger');
    expect(data).to.have.length(1);
  });

  it('sets class to "alert-success" with no error', () => {
    const catalog = TestUtils.renderIntoDocument(
      <Alert message="error" />
    );
    const data = TestUtils.scryRenderedDOMComponentsWithClass(catalog, 'alert-success');
    expect(data).to.have.length(1);
  });

});
