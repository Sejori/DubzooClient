import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Graph extends Component {
  constructor(props) {
    super(props)

    this.state = { goalInput: "" }
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  render() {

    let momentumEmoji = "📈"
    if (this.props.momentum < 0) momentumEmoji = "📉"

    let goalText = ""
    let daysTillGoal
    if (this.state.goalInput) {
      daysTillGoal = (this.state.goalInput - this.props.latestValue) / this.props.momentum
      goalText = "Approximately " + Math.round(daysTillGoal) + " days away from achieving goal."
      console.log(this.state.goalInput, this.props.latestValue, this.props.momentum, daysTillGoal)
    }
    if (this.state.goalInput && (this.props.momentum < 0)) goalText = "Getting further away from your goal. Take action!"
    if (this.state.goalInput && (daysTillGoal < 0)) goalText = "Already surpassed goal."

    return(
      <div className="card mb-3" style={{borderWidth: "1px", borderColor: this.props.colour, width: "30rem"}} key={this.props.graphData.datasets[0].label}>
        <div className="card-header" style={{backgroundColor: this.props.colour, color: "white"}}>{this.props.social} {this.props.name} @{this.props.handle}</div>
        <div className="card-body">
          <Line data={this.props.graphData} options={this.props.options}/>
          <div className="row" style={{justifyContent: "space-between", margin: "0px 10px"}}>
            <div className="goal-input" style={{display: "flex"}}>
              <p><strong>Goal:&nbsp;</strong></p>
              <input
                name= "goalInput"
                type="text"
                placeholder=""
                value={this.state.goalInput}
                onChange={this.handleChange}
                size="16"
              />
            </div>
            <div className="momentum-display" style={{display: "flex"}}>
              <p><strong>Momentum:&nbsp;</strong>{this.props.momentum}/day&nbsp;{momentumEmoji}</p>
            </div>
          </div>
          <p>{goalText}</p>
        </div>
      </div>
    )
  }
}

export default Graph
