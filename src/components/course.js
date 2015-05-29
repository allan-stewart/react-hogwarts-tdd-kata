import React from "react";
import moment from "moment";

export default class Course extends React.Component {

  handleRegisterClick(event) {
    event.preventDefault();
    this.props.onRegister(this.props.course);
  }

  render() {
    var course = this.props.course;
    if (!course) {
      return null;
    }
    return (
      <tr>
        <td>{course.name}</td>
        <td>{course.professor}</td>
        <td>{course.credits}</td>
        <td>{moment(course.startTime).format("h:mm a")}</td>
        { this.props.onRegister ? <td><a href="#" onClick={this.handleRegisterClick.bind(this)}>Register</a></td> : null }
      </tr>
    );
  }

}
