//  Card takes platform, colour, handle, metric, current_value and previous_value
//  to create a card to be used in various locations around the app.

import React, { Component } from 'react';

class Card extends Component {

  withCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    let changeValue = this.props.current_value - this.props.previous_value
    let changePercent = ((changeValue / this.props.previous_value) * 100).toFixed(2);
    let changeIcon = '-'
    if (changeValue > 0) changeIcon = '⬆️'
    if (changeValue < 0) changeIcon = '⬇️'

    return(
      <div className='card mb-3' style={{borderWidth: "1px", borderColor: this.props.colour, width: "20rem"}}>
        <div className="card-header">{this.props.platform} @{this.props.handle}</div>
        <div className="card-body">
          <h4 className="card-title" style={{textAlign: "center"}}>{this.props.metric}</h4>
          <h2 className="card-title" style={{textAlign: "center"}}>{this.withCommas(this.props.current_value)}</h2>
          <p className="card-text">{changeIcon} {changeValue} {changePercent}% (24hrs)</p>
        </div>
      </div>
    )
  }
}

export default Card
