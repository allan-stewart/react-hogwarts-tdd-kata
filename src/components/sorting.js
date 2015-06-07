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
    var alert = this.state.selectedHouse
      ? <div className="alert alert-success">You are assigned to {this.state.selectedHouse}!</div>
      : null;

    return (
      <div>
        <div className="jumbotron" style={{"padding": "10px"}}>
          <h1>Welcome to Hogwarts, wizard!</h1>
          <p>Welcome to the wonderful world of hogwarts.  Click the sorting hat to discover which house you will be assigned to.</p>
        </div>
        { alert }
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
