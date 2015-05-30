import React from "react";

export default class SortingHouse extends React.Component {

  render() {
    var selectedStyle = {
      "color": "green",
      "fontWeight": "bold"
    };
    var style = this.props.selected ? selectedStyle : {};
    return (
      <span style={style}>House {this.props.houseName}</span>
    );
  }
}
