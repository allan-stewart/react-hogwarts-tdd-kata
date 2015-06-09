import {expect, assert} from 'chai';
import React from 'react/addons';
import sinon from 'sinon';

import Catalog from '../../../src/components/catalog';
import Course from '../../../src/components/course';
import catalogStore from '../../../src/stores/catalog-store';
import catalogActions from '../../../src/actions/catalog-actions';
import wizardActions from '../../../src/actions/wizard-actions';


var TestUtils = React.addons.TestUtils;
var mockCatalogStore = sinon.mock(catalogStore);
var mockCatalogActions = sinon.mock(catalogActions);
var mockWizardActions = sinon.mock(wizardActions);

describe('catalog component', () => {

  it('renders html headers', () => {
    var catalog = TestUtils.renderIntoDocument(
      <Catalog />
    );
    var titles = TestUtils.scryRenderedDOMComponentsWithTag(catalog, 'th');
    expect(titles).to.have.length.above(3);
    expect(titles[0].getDOMNode().textContent).be.equal('Class');
    expect(titles[1].getDOMNode().textContent).be.equal('Professor');
    expect(titles[2].getDOMNode().textContent).be.equal('Credits');
    expect(titles[3].getDOMNode().textContent).be.equal('Time');
  });

  it('renders course', () => {
    var catalog = TestUtils.renderIntoDocument(
      <Catalog />
    );
    catalog.setState({catalog: [
      {id: "RUN105", name: "Ancient Runes", startTime: new Date(0,0,0,13), professor: "Bathsheba Babbling", credits: 3 }
    ]});
    var courseData = TestUtils.scryRenderedComponentsWithType(catalog, Course);
    expect(courseData[0].props.course.id).equal("RUN105");
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
    expect(courseData[0].props.course.id).equal("RUN105");
    expect(courseData[1].props.course.id).equal("AST101");
    expect(courseData[2].props.course.id).equal("DDA302-10");
  });

  it('renders course with key assigned to course.id', () => {
    var catalog = TestUtils.renderIntoDocument(
      <Catalog />
    );
    catalog.setState({catalog: [
      {id: "RUN105", name: "Ancient Runes", startTime: new Date(0,0,0,13), professor: "Bathsheba Babbling", credits: 3 }
    ]});
    var courseData = TestUtils.scryRenderedDOMComponentsWithTag(catalog, "tbody");
    expect(courseData[0].props.children[0].key).equal("RUN105");
  });

  it('renders course with an onRegister prop', () => {
    var catalog = TestUtils.renderIntoDocument(
      <Catalog />
    );
    catalog.setState({catalog: [
      {id: "RUN105", name: "Ancient Runes", startTime: new Date(0,0,0,13), professor: "Bathsheba Babbling", credits: 3 }
    ]});
    var courseData = TestUtils.scryRenderedComponentsWithType(catalog, Course);
    expect(courseData[0].props.onRegister).equal(catalog.onRegister);
  });

  it('invokes catalogActions.getCatalog on componentDidMount', () => {
    mockCatalogActions.expects("getCatalog").once();
    var catalog = TestUtils.renderIntoDocument(
      <Catalog />
    );
    mockCatalogActions.verify();
  });

  it('listens to the catalogStore on componentDidMount', () => {
    mockCatalogStore.expects("listen").once();
    var catalog = TestUtils.renderIntoDocument(
      <Catalog />
    );
    mockCatalogStore.verify();
  });

  it('unlistens to the catalogStore on componentWillUnmount', () => {
    mockCatalogStore.expects("unlisten").once();
    var catalog = TestUtils.renderIntoDocument(
      <Catalog />
    );
    catalog.componentWillUnmount();
    mockCatalogStore.verify();
  });

  it('changes state when the catalogStore changes', () => {
    var catalog = TestUtils.renderIntoDocument(
      <Catalog />
    );
    var courses = [{id: "RUN105", name: "Ancient Runes", startTime: new Date(0,0,0,13), professor: "Bathsheba Babbling", credits: 3 }];
    expect(catalog.state.catalog).equal(undefined);
    catalogActions.updateCatalog(courses);
    expect(catalog.state.catalog).equal(courses);
  });

  it('invokes wizardActions.registerForCourse when onRegister is called', () => {
    var course = {id: "RUN105", name: "Ancient Runes", startTime: new Date(0,0,0,13), professor: "Bathsheba Babbling", credits: 3 };
    mockWizardActions.expects("registerForCourse").once().withExactArgs(course);
    var catalog = TestUtils.renderIntoDocument(
      <Catalog />
    );
    catalog.onRegister(course);
    mockWizardActions.verify();
  });

});
