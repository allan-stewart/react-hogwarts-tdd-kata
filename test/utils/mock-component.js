import React from 'react';
import sinon from 'sinon';

export default function mockComponent (module, mockTagName) {
  mockTagName = mockTagName || module.mockTagName || "div";

  sinon.stub(module.prototype, "render", function() {
    return React.createElement(
      mockTagName,
      null,
      this.props.children
    );
  });

  return this;
};
