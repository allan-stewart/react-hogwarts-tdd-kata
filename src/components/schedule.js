import React from "react";
import _ from "lodash";

import wizardStore from "../stores/wizard-store";
import wizardActions from "../actions/wizard-actions";
import Course from "./course";

export default class Schedule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.changeFn = this.onWizardChange.bind(this);
    wizardStore.listen(this.changeFn);
    wizardActions.getWizard();
  }

  componentWillUnmount() {
    wizardStore.unlisten(this.changeFn);
  }

  onWizardChange(store) {
    this.setState(store.wizard);
  }

  render() {
    return (
      <div>
        <div className="jumbotron" style={{"padding": "10px"}}>
          <h1>Your Hogwarts schedule</h1>
        </div>
        <div>
          <div className="panel panel-default" >

            <table className="table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Professor</th>
                  <th>Credits</th>
                  <th>Time</th>
                </tr>
              </thead>

              <tbody>
                { _.map(this.state.courses, item => <Course key={item.id} course={item} /> ) }
              </tbody>

            </table>
          </div>
        </div>
      </div>
    );
  }
}
