import React from "react";
import _ from "lodash";

import SortingHat from "./sorting-hat";
import SortingHouse from "./sorting-house";
import WizardStore from "../stores/wizard-store";
import HouseStore from "../stores/house-store";
import Alert from "./alert";

export default class Sorting extends React.Component {

  constructor(props) {
    super(props);
    this.state = WizardStore.getState();
    this.state.houses = HouseStore.getState().houses;
  }

  componentDidMount() {
    WizardStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    WizardStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var house = this.state.wizard.house;
    var message = house ? "You are assigned to " + house + "!" : null;

    return (
      <div>
        <div className="jumbotron" style={{"padding": "10px"}}>
          <h1>Welcome to Hogwarts, wizard!</h1>
          <p>Welcome to the wonderful world of hogwarts.  Click the sorting hat to discover which house you will be assigned to.</p>
        </div>
        <Alert message={message}></Alert>
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
