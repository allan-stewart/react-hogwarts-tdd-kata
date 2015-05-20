import React from 'react';
import _ from 'lodash';
import moment from 'moment';


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

  constructor () {
    super();
    this.state = { catalog: [
      {id: "RUN105", name: "Ancient Runes", startTime: new Date(0,0,0,13), professor: "Bathsheba Babbling", credits: 3 }
    ]};
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
            //<div ng-show="response && response.success" className="alert alert-success">Successfully registered</div>
            //<div ng-show="response && !response.success" className="alert alert-danger">{{response.message}}</div>

React.render(<Catalog />, document.getElementById('app'))
