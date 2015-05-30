import React from "react";

import SorterActions from "../actions/sorting-actions";

export default class SortingHat extends React.Component {

  onSortingRequested() {
    SorterActions.sortingRequested();
  }

  render() {
    return (
      <button type="button" onClick={this.onSortingRequested}>Hat (click me)</button>
    );
  }
}
