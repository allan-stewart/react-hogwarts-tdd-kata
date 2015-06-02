import React from "react";
import _ from "lodash";

import SortingHat from "./sorting-hat";
import SortingHouse from "./sorting-house";
import SortingStore from "../stores/sorting-store";

export default class Sorting extends React.Component {

  constructor(props) {
    super(props);
    this.state = SortingStore.getState();
  }

  componentDidMount() {
    SortingStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    SortingStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1>Welcome to Hogwarts, wizard!</h1>
          <p>Welcome to the wonderful world of hogwarts.  Click the sorting hat to discover which house you will be assigned to.</p>
        </div>
        <div className="pull-left">
          <SortingHat />
        </div>
        <div className="well pull-left">
          {
            _.map(this.state.houses, h =>
                <SortingHouse houseName={h} selected={this.state.selectedHouse === h} key={h}/>
              )
          }
        </div>
      </div>
    );
  }
}
