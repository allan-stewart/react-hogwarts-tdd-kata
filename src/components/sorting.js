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
        <h2> Sorting </h2>
        <ul>
          <li><SortingHat /></li>
          {
            _.map(this.state.houses, h =>
              <li>
                <SortingHouse houseName={h} selected={this.state.selectedHouse === h}/>
              </li>)
          }
        </ul>
      </div>
    );
  }
}
