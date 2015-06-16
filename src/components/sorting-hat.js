import React from 'react';

import WizardActions from '../actions/wizard-actions';

export default class SortingHat extends React.Component {

  onSortingRequested() {
    WizardActions.sortIntoHouse();
  }

  render() {
    return (
      <img src="/img/sorting-hat.jpg" onClick={this.onSortingRequested}></img>
    );
  }
}
