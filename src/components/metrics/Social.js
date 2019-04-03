//                        SOCIAL BLOCK
//
// Creates graphs of social data passed in as props

import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Social extends Component {

  createName = (oldName) => {
    let nameParts = oldName.split('_')
    let newName = nameParts[0]
    if (nameParts[1]) newName = nameParts[0] + ' ' + nameParts[1]
    return newName
  }

  formatDate = (dateArray) => {
    let dates = dateArray.map(element => {
      var date = new Date(element)
      var dd = date.getDate();
      var mm = date.getMonth() + 1; //January is 0!

      var yyyy = date.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      return dd + '/' + mm + '/' + yyyy;
    })
    return dates
  }

  render() {
    var graphData = []
    var graphs = []
    var options = []
    var i = 0
    var j = 0

    let graphDataSets = []
    let justX = [] // need this for graph labels
    // build graph data sets for every parameter in data
    for (var key in this.props.data[0]) {

      if (key !== 'username' && key !== 'date_requested') {
        // build dataset object for every set of data in db
        graphDataSets[i] = {}
        graphDataSets[i].label = key
        graphDataSets[i].data = []
        graphDataSets[i].fill = false
        graphDataSets[i].borderWidth = 2
        graphDataSets[i].lineTension = 0
        graphDataSets[i].borderColor = "#5801C3"
        graphDataSets[i].backgroundColor = "#fff"

        for (j=0; j<this.props.data.length; j++) {

          // create objects for each data point
          graphDataSets[i].data[j] = {}

          // build x values from data times
          justX[j] = this.props.data[j].date_requested
          graphDataSets[i].data[j].x = this.props.data[j].date_requested
          graphDataSets[i].data[j].y = this.props.data[j][key]
        }
        i++
      }
    }

    // need many graphs due to difference in scale of metrics
    for (i=0; i<graphDataSets.length; i++) {
      var current_value = 0
      var previous_value = 0

      graphData[i] = {}
      graphData[i].datasets = [graphDataSets[i]]
      graphData[i].labels = this.formatDate(justX)
      graphData[i].key = graphDataSets[i].label

      options = {
        "legend": {
          "display": false
        },
        "scales": {
          "yAxes": [{
            "ticks": {
              "beginAtZero": true,
              "callback": function (x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            }
          }]
        }
      }

      if (graphData[i].datasets[0].data[graphData[i].datasets[0].data.length-2]) {
        previous_value = (graphData[i].datasets[0].data[graphData[i].datasets[0].data.length-2].y)
      }

      if (graphData[i].datasets[0].data[graphData[i].datasets[0].data.length-1]) {
        current_value = (graphData[i].datasets[0].data[graphData[i].datasets[0].data.length-1].y)
      }

      let changeValue = current_value - previous_value
      let changePercent = ((changeValue / this.props.previous_value) * 100).toFixed(2);
      let changeIcon = '-'
      if (changeValue > 0) changeIcon = '⬆️'
      if (changeValue < 0) changeIcon = '⬇️'

      graphs[i] = <div className="card mb-3" style={{borderWidth: "1px", borderColor: this.props.colour, width: "30rem"}} key={graphData[i].datasets[0].label}>
        <div className="card-header">{this.props.social} @{this.props.handle}</div>
        <div className="card-body">
          <h2 className="card-title" style={{textAlign: "center"}}>{this.createName(graphData[i].datasets[0].label)}</h2>
          <Line data={graphData[i]} options={options} key={i}/>
          <p className="card-text">{changeIcon} {changeValue} {changePercent}% (past 24hrs)</p>
        </div>
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
