//                        SOCIAL BLOCK
//
// Creates graphs of social data passed in as props

import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

import Card from './Card'

class Social extends Component {

  createName = (oldName) => {
    let nameParts = oldName.split('_')
    let newName = nameParts[0]
    if (nameParts[1]) newName = nameParts[0] + ' ' + nameParts[1]
    return newName
  }

  withCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
      var current_value
      var previous_value

      graphData[i] = {}
      graphData[i].datasets = [graphDataSets[i]]

      options[i] = {
        "legend": {
          "display": true,
        "scales": {
          "xAxes": [{
            "type": "time",
            "distribution": 'linear',
            "time": {
              "displayFormats": {
                "day": 'MMM D'
              }
            }
          }],
          "yAxes": [{
            "ticks": {
              "suggestedMin": graphDataSets[i].data[0].y * 0.95,
              "suggestedMax": graphDataSets[i].data[graphDataSets[i].data.length-1].y * 1.05,
              "callback": this.withCommas(graphDataSets[i].label)
              }
            }]
          }
        }
      }

      if (graphData[i].datasets[0].data[graphData[i].datasets[0].data.length-2]) {
        previous_value = (graphData[i].datasets[0].data[graphData[i].datasets[0].data.length-2].y)
      }

      if (graphData[i].datasets[0].data[graphData[i].datasets[0].data.length-1]) {
        current_value = (graphData[i].datasets[0].data[graphData[i].datasets[0].data.length-1].y)
      }

      graphs[i] = <div className="graph-div" key={graphData[i].datasets[0].label}>
        <Card
          platform={this.props.social}
          color={"#ffffff"}
          handle={this.props.handle}
          metric={this.createName(graphData[i].datasets[0].label)}
          current_value={current_value}
          previous_value={previous_value}
        />
        <Line data={graphData[i]} options={options[i]} key={i}/>
      </div>
    }

    return(
      <div className="social">
        <div className="graphs">
          {graphs}
        </div>
      </div>
    )
  }
}

export default Social;
