import React from "react";
import moment from "moment";

export default class Course extends React.Component {

  render() {
    var course = this.props.course;
    if (!course) {
      return null;
    }
    return (
      <tr>
        <td>{course.name}</td>
        <td>{moment(course.startTime).format("h:mm a")}</td>
        <td>{course.professor}</td>
        <td>{course.credits}</td>
      </tr>
    );
  }

}

