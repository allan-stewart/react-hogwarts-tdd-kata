import React from "react";

import Catalog from "./src/components/catalog.jsx";


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

React.render(<Catalog />, document.getElementById("app"));
