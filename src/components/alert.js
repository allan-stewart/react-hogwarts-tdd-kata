import React from "react";

export default class Alert extends React.Component {

  render() {
    if (!this.props.message) {
      return null;
    }

    var alertClass = this.props.error ? "alert-danger" : "alert-success";
    return (
      <div className={"alert " + alertClass}>
        {this.props.message}
      </div>
    );
  }
}
