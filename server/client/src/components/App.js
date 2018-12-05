import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';

// components
import Header from './Header.js';
const Dashboard = () => <h2>Dashboard</h2>
const Landing = () => <h2>Landing</h2>

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    }
  }
  // Early http request to get user/check auth
  async componentDidMount() {
    const res = await axios.get('/api/current_user')
    let user = res.data
    if (user === "") { user = false }
    console.log(user)
  }

  render() {
    return(
      <div className="container">
        <BrowserRouter>
          <div>
            <Header user={this.state.user}/>
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
