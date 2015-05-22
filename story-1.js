import React from "react";
import _ from "lodash";

//import alt from "./src/alt";

import Course from "./src/components/course";
import catalogStore from "./src/stores/catalog-store";
import catalogActions from "./src/actions/catalog-actions";


//////////////////////////
// Components
//////////////////////////

export class RegistrationResponse extends React.Component {

  render() {
    var response = this.props.response;
    var message;
    if (response) {
      var classString = "alert ";
      if (response.success) {
        classString += "alert-success";
        message = <div className={classString}>Successfully registered</div>;
      } else {
        classString += "alert-danger";
        message = <div className={classString}>{response.message}</div>;
      }
    }
    return {message};
  }
}

export class Catalog extends React.Component {

  constructor(props) {
    super(props);
    this.state = catalogStore.getState();
  }

  componentDidMount() {
    catalogStore.listen(this.onChange.bind(this));
    catalogActions.getCatalog();
  }

  componentWillUnmount() {
    catalogStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1>Hogwarts course catalog!</h1>
          <p>Select your wizarding classes!</p>
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
                { _.map(this.state.catalog, item => <Course course={item} /> ) }
              </tbody>

            </table>
          </div>
        </div>
      </div>
    );
  }
}

React.render(<Catalog />, document.getElementById("app"));
