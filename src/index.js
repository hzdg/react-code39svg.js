import React, {PropTypes} from 'react';
import {Code39} from 'tualo-code39';


export default class Code39Svg extends React.Component {

  static propTypes = {
    children: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  render() {
    const encoded = new Code39().getCode(this.props.children);

    let x = 0;
    let bars = [];
    for (let char of encoded.split('')) {
      const width = getCharWidth(char);

      // Lower case letters represent gaps, so we don't have to draw anything
      // for those.
      if (isUpperCase(char)) {
        bars.push(
          <rect key={x} x={x} y="0" width={width} height="1" />
        );
      }
      x += width;
    }

    return (
      <svg
        style={{display: 'block'}}
        preserveAspectRatio="none"
        width={this.props.width}
        height={this.props.height}
        viewBox={`0 0 ${x} 1`}
      >
        {bars}
      </svg>
    );
  }

}

function getCharWidth(char) {
  // "n" and "N" are 1/3 the width of w/W
  return char.toLowerCase() === 'w' ? 3 : 1;
}

function isUpperCase(str) {
  return str === str.toUpperCase();
}
