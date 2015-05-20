import React from 'react/addons'

class TestComponent extends React.Component {
  render() {
    return <div>Awesomesauce</div>
  }
}

const TestUtils = React.addons.TestUtils

describe('placeholder component', () => {

  it ('is sane', () => {
    var renderedComponent = TestUtils.renderIntoDocument(
      <TestComponent />
    )
    React.findDOMNode(renderedComponent).textContent.should.eql('Awesomesauce')
  })

})
