import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import Alt from 'alt';

//////////////////////////
// Actions
//////////////////////////

class CatalogActions {
  updateCatalog(catalog) {
    this.dispatch(catalog);
  }
}

//////////////////////////
// Stores
//////////////////////////

class CatalogStore {
  constructor() {
    this.catalog = [];
    this.bindListeners({
      handleUpdateCatalog: CatalogActions.UPDATE_CATALOG
    });
  }

  handleUpdateCatalog(catalog) {
    this.catalog = catalog;
  }
}

//////////////////////////
// Components
//////////////////////////

class RegistrationResponse extends React.Component {

  render() {
    var response = this.props.response;
    var message;
    if (response) {
      var classString = 'alert ';
      if (response.success) {
        classString += 'alert-success';
        message = <div className={classString}>Successfully registered</div>
      } else {
        classString += 'alert-danger';
        message = <div className={classString}>{response.message}</div>
      }
    }
    return {message}
  }
}

class Course extends React.Component {

  render() {
    var course = this.props.course;
    return (
      <tr>
        <td>{course.name}</td>
        <td>{moment(course.startTime).format('h:mm a')}</td>
        <td>{course.professor}</td>
        <td>{course.credits}</td>
      </tr>
    )
  }
}

class Catalog extends React.Component {

  constructor(props) {
    super(props);
    this.state = { catalog: CatalogStore.getState() }
  }

  componentDidMount() {
    CatalogStore.listen(this.onChange);
  }

  componentWillUnmount() {
    CatalogStore.unlisten(this.onChange);
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
    )
  }
}

React.render(<Catalog />, document.getElementById('app'))
