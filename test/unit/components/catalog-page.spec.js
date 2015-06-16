import {expect} from 'chai';
import React from 'react/addons';

import CatalogPage from '../../../src/components/catalog-page';
import Catalog from '../../../src/components/catalog';
import Alert from '../../../src/components/alert';


const TestUtils = React.addons.TestUtils;

describe('CatalogPage component', () => {

  it('has child Catalog', () => {
    const component = TestUtils.renderIntoDocument(
      <CatalogPage />
    );
    expect(TestUtils.scryRenderedComponentsWithType(component, Catalog)).to.have.length(1);
  });

  it('has child Alert', () => {
    const component = TestUtils.renderIntoDocument(
      <CatalogPage />
    );
    expect(TestUtils.scryRenderedComponentsWithType(component, Alert)).to.have.length(1);
  });

});
