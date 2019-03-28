//                        SOCIAL BLOCK
//
// Creates graphs of social data passed in as props

import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Social extends Component {

  render() {

    const testData = {
      "datasets": [{
        "label": "views",
        "data": [{
          "x": 1551434007000,
          "y": 0
        }, {
          "x": 1551434022000,
          "y": 0
        }],
        "fill": false,
        "borderWidth": 5,
        "lineTension": 0.25,
        "borderColor": "#09d6cc",
        "backgroundColor": "rgba(9, 214, 204, 0.5)"
      },
      {
        "label": "views",
        "data": [{
          "x": 1551434007000,
          "y": 0
        }, {
          "x": 1551434022000,
          "y": 0
        }],
        "fill": false,
        "borderWidth": 5,
        "lineTension": 0.25,
        "borderColor": "#09d6cc",
        "backgroundColor": "rgba(9, 214, 204, 0.5)"
      }]
    }

    const options = {
      "legend": {
        "labels": {},
        "position": 'bottom'
      },
      "scales": {
        "xAxes": [{
          "type": "time",
          // "time": {
          //   "unit": "day"
          // }
        }]
      }
    }

    return(
      <div className="social">
        <h2>{this.props.social}</h2>
        <h3>{this.props.handle}</h3>
        <Line data={testData} options={options}/>
      </div>
    )
  }
}

export default Social;
