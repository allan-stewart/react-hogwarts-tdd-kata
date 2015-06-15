import React from "react";

export default class SortingHouse extends React.Component {

  render() {
    var baseStyle = {
      "width": "180px",
      "marginRight": "20px"
    };
    var selectedStyle = {
      "width": "180px",
      "marginRight": "20px",
      "border": "4px solid brown"
    };
    var style = this.props.selected ? selectedStyle : baseStyle;
    var imagePath = "img/" + this.props.houseName.toLowerCase() + ".jpg";
    return (
      <img style={style} src={imagePath}></img>
    );
  }
}
