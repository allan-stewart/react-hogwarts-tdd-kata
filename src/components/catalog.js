import React from "react";
import _ from "lodash";

import catalogStore from "../stores/catalog-store";
import catalogActions from "../actions/catalog-actions";
import Course from "./course";

export default class Catalog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
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
                {
                  _.map(this.state.catalog,
                        item => <Course course={item} key={item.id} /> )
                }
              </tbody>

            </table>
          </div>
        </div>
      </div>
    );
  }
}

