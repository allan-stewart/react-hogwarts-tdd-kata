import React from "react";

import WizardStore from "../stores/wizard-store";
import WizardActions from "../actions/wizard-actions";
import Course from "./course";

export default class Schedule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.courses = [];
  }

  componentDidMount() {
    WizardStore.listen(this.onWizardChange.bind(this));
    WizardActions.getWizard();
  }

  componentWillUnmount() {
    WizardStore.unlisten(this.onWizardChange);
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
                { this.state.courses.map( item => <Course key={item.id} course={item} /> ) }
              </tbody>

            </table>
          </div>
        </div>
      </div>
    );
  }
}
