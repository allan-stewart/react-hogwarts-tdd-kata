import React from "react";
import _ from "lodash";

import catalogStore from "../stores/catalog-store";
import catalogActions from "../actions/catalog-actions";
import wizardStore from "../stores/wizard-store";
import wizardActions from "../actions/wizard-actions";
import Course from "./course";
import Alert from "./alert";

export default class Catalog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    catalogStore.listen(this.onChange.bind(this));
    wizardStore.listen(this.onChange.bind(this));
    catalogActions.getCatalog();
  }

  componentWillUnmount() {
    catalogStore.unlisten(this.onChange);
    wizardStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  onRegister(course) {
    wizardActions.registerForCourse(course);
  }

  render() {
    var alertData = this.state.registrationResponse || {};

    return (
      <div>
        <div className="jumbotron" style={{"padding": "10px"}}>
          <h1>Hogwarts course catalog!</h1>
          <p>Select your wizarding classes!</p>
        </div>
        <div>
          <Alert error={alertData.error} message={alertData.message} />
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
                {
                  _.map(this.state.catalog,
                        item => <Course course={item} key={item.id} onRegister={this.onRegister}/> )
                }
              </tbody>

            </table>
          </div>
        </div>
      </div>
    );
  }
}
