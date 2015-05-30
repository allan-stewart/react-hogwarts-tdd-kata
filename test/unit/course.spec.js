import should from 'should';
import React from 'react/addons';

import Course from '../../src/components/course'


var TestUtils = React.addons.TestUtils;

describe('course component', function() {

  let course = {
    name: "DADA",
    professor: "Quirinus Quirrell",
    credits: "3",
    startTime: new Date(0, 0, 0, 11, 30),
  };

  it('renders', () => {
    var catalog = TestUtils.renderIntoDocument(
      <table>
        <tbody>
          <Course course={course}/>
        </tbody>
      </table>
    );
    var data = TestUtils.scryRenderedDOMComponentsWithTag(catalog, "td");
    should(data[0].getDOMNode().textContent).be.equal("DADA");
    should(data[1].getDOMNode().textContent).be.equal("Quirinus Quirrell");
    should(data[2].getDOMNode().textContent).be.equal("3");
  });

  it('TODO renders time correctly', () => {
    var catalog = TestUtils.renderIntoDocument(
      <table>
        <tbody>
          <Course course={course}/>
        </tbody>
      </table>
    );
    var data = TestUtils.scryRenderedDOMComponentsWithTag(catalog, 'td');
    should(data[3].getDOMNode().textContent).be.equal('11:30 am');
  });

  it('renders nothing if no course is supplied', () => {
    var catalog = TestUtils.renderIntoDocument(
      <table>
        <tbody>
          <Course />
        </tbody>
      </table>
    );
    var data = TestUtils.scryRenderedDOMComponentsWithTag(catalog, 'td');
    should(data.length).be.equal(0);
  });

});

