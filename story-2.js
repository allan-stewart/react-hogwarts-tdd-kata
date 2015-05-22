import React from "react";
import _ from "lodash";

import Alt from "alt";

var alt = new Alt();

import Course from "./src/components/course";

//////////////////////////
// Actions
//////////////////////////

export class WizardActions {

  registerForCourse(courseId) {
    this.dispatch(courseId);
  }

  getRegisteredCourses() {

  }

}

var wizardActions = alt.createActions(WizardActions);

//////////////////////////
// Stores
//////////////////////////

export class WizardStore {

  constructor() {
    this.registeredCourses = [
      // TODO: Remove this hard-coded course; I only put it in for testing purposes.
      {id: "RUN105", name: "Ancient Runes", startTime: new Date(0,0,0,13), professor: "Bathsheba Babbling", credits: 3 }
    ];
    this.bindAction(wizardActions.registerForCourse, this.handleRegisteredCourse);
  }

  handleRegisteredCourse(courseId) {
    var course = {id: courseId}; // TODO: lookup the course from the CatalogRepository?
    this.registeredCourses.push(course);
  }
}

var wizardStore = alt.createStore(WizardStore);

//////////////////////////
// Components
//////////////////////////

export class Schedule extends React.Component {

  constructor(props) {
    super(props);
    this.state = wizardStore.getState();
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
                  <th>Time</th>
                  <th>Professor</th>
                  <th>Credits</th>
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

React.render(<Schedule />, document.getElementById("app"));
