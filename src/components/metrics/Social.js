//                        SOCIAL BLOCK
//
// Creates graphs of social data passed in as props

import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Social extends Component {

  render() {
    var graphData = []
    var graphs = []
    var options = []
    var i = 0
    var j = 0

    let graphDataSets = []
    // build graph data sets for every parameter in data
    for (var key in this.props.data[0]) {

      if (key !== 'username' && key !== 'date_requested') {
        // build dataset object for every set of data in db
        graphDataSets[i] = {}
        graphDataSets[i].label = key
        graphDataSets[i].data = []
        graphDataSets[i].fill = false
        graphDataSets[i].borderWidth = 5
        graphDataSets[i].lineTension = 0.25
        graphDataSets[i].borderColor = "#09d6cc"
        graphDataSets[i].backgroundColor = "rgba(9, 214, 204, 0.5)"

        for (j=0; j<this.props.data.length; j++) {

          // create objects for each data point
          graphDataSets[i].data[j] = {}

          // build x values from data times
          graphDataSets[i].data[j].x = this.props.data[j].date_requested
          graphDataSets[i].data[j].y = this.props.data[j][key]
        }
        i++
      }
    }

    // need many graphs due to difference in scale of metrics
    for (i=0; i<graphDataSets.length; i++) {

      graphData[i] = {}
      graphData[i].datasets = [graphDataSets[i]]
      console.log(graphData)

      options[i] = {
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

      graphs[i] = <div className="graph-div" key={graphData[i].datasets[0].label}>
        <h2>{graphData[i].datasets[0].label}</h2>
        <Line className="graph" data={graphData[i]} options={options[i]} key={i}/>
      </div>
    }

    return(
      <div className="social">
        <h2>{this.props.social}</h2>
        <h3>{this.props.handle}</h3>
        <div className="graphs">
          {graphs}
        </div>
      </div>
    )
  }
}

export default Social;
