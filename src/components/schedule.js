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
    wizardStore.listen(this.onChange.bind(this));
    wizardActions.getRegisteredCourses();
  }

  componentWillUnmount() {
    wizardStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1>Your Hogwards schedule</h1>
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
                { _.map(this.state.registeredCourses, item => <Course key={item.id} course={item} /> ) }
              </tbody>

            </table>
          </div>
        </div>
      </div>
    );
  }
}
