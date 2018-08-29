import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard';
import Signin from './Signin'

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div>
        <LoadingBar />
        {
          this.props.signedIn === true 
            ? <Signin /> 
            : <Dashboard />
        }
      </div>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    signedIn: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
