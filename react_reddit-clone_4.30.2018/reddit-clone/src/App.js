import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import logo from './logo.svg'
import './App.css';
import FrontPage from './components/FrontPage'

class App extends Component {
  constructor() {
    super()
    this.state = {
      children: [],
    }
  }

  componentWillMount() {
    this.fetchFrontPage()
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Redditor</h1>
          </header>
          <FrontPage redditPosts={this.state.children} />
        </div>
      </MuiThemeProvider>
    );
  }

  fetchFrontPage() {
    fetch('https://www.reddit.com/.json')
    .then(res => res.json())
    .then(postData => {
        this.setState({ children: postData.data.children })
      })
    .catch(error => alert('failed to fetch reddit data'))
  }
}

export default App;
