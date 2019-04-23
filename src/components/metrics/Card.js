//  Card takes platform, colour, handle, metric, current_value and previous_value
//  to create a card to be used in various locations around the app.

import React, { Component } from 'react';

class Card extends Component {

  withCommas = (x) => {
    x = Number(x)
    if (x > 1000) return x
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    let changeValue = this.props.current_value - this.props.previous_value
    let changePercent = ((changeValue / this.props.previous_value) * 100).toFixed(2);
    let changeIcon = '-'
    if (changeValue > 0) changeIcon = '⬆️'
    if (changeValue < 0) changeIcon = '⬇️'
    if (changePercent > 100) changePercent = 0
    if (changePercent.isNan) changePercent = 0

    return(
      <div className='card mb-3' style={{borderWidth: "1px", borderColor: this.props.colour, width: "20rem"}}>
        <div className="card-header" style={{backgroundColor: this.props.colour, color: 'white'}}>{this.props.platform} {this.props.metric} @{this.props.handle}</div>
        <div className="card-body">
          <h2 className="card-title" style={{textAlign: "center"}}>{this.withCommas(this.props.current_value)}</h2>
          <h4 className="card-title" style={{textAlign: "center", color: "grey"}}>{this.withCommas(this.props.previous_value)}</h4>
          <h4 style={{textAlign: "right"}}>{changeValue} {changeIcon} ({changePercent}%)</h4>
        </div>
      </div>
    )
  }
}

export default Card
