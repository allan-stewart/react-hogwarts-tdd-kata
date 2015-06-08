import React from "react";

import SorterActions from "../actions/sorting-actions";

export default class SortingHat extends React.Component {

  onSortingRequested() {
    SorterActions.sortingRequested();
  }

  render() {
    return (
      <img src="/img/sorting-hat.jpg" onClick={this.onSortingRequested}></img>
    );
  }
}
