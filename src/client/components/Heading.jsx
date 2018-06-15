require('../styles/Heading.css');

import React, {Component} from 'react';
import Card from 'terra-card';
import Text from 'terra-text';

class Heading extends Component{
  render() {
    return (
        <div className="headingBody">
          <h1 className="headingText">DEVACADEMY TRACKER TOOL </h1>
        </div>
    );
  }
}
export default Heading;
