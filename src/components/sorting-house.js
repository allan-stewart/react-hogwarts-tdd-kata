import React from 'react';

export default class SortingHouse extends React.Component {

  propTypes: {
    selected: React.PropTypes.object,
    houseName: React.PropTypes.string,
  }

  render() {
    const baseStyle = {
      'width': '180px',
      'marginRight': '20px',
    };
    const selectedStyle = {
      'width': '180px',
      'marginRight': '20px',
      'border': '4px solid brown',
    };
    const style = this.props.selected ? selectedStyle : baseStyle;
    const imagePath = 'img/' + this.props.houseName.toLowerCase() + '.jpg';
    return (
      <img style={style} src={imagePath}></img>
    );
  }
}
