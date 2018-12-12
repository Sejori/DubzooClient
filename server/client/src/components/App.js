import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';
import '../bulmaStyles.css';

// components
import Header from './Header.js';
import Landing from './Landing.js'
import Dashboard from './Dashboard.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: null,
    }
  }
  // Early http request to get user/check auth
  async componentDidMount() {
    const res = await axios.get('/api/current_user')
    let auth = res.data
    if (auth === "") { auth = false }
    this.setState({ auth: auth })
  }

  render() {
    return(
      <div className="container">
        <BrowserRouter>
          <div>
            <Header auth={this.state.auth}/>
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
