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

      graphs[i] = <div className="card mb-3" style={{borderWidth: "1px", borderColor: this.props.colour, width: "30rem"}} key={graphData[i].datasets[0].label}>
        <div className="card-header" style={{backgroundColor: this.props.colour, color: "white"}}>{this.props.social} {this.createName(graphData[i].datasets[0].label)} @{this.props.handle}</div>
        <div className="card-body">
          <Line data={graphData[i]} options={options} key={i}/>
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
