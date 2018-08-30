import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard';
import Signin from './Signin'
import NewQuestion from './NewQuestion';
import QuestionDetails from './QuestionDetails'
import Leaderboard from './Leaderboard'
import Navbar from './Navbar'

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <div>
          <LoadingBar />
          <Navbar authedUser={this.props.authedUser} />
          {
            this.props.signedIn === true 
              ? <Signin /> 
              : <div>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/questions/:id' component={QuestionDetails} />
                  <Route path='/add' component={NewQuestion} />
                  <Route path='/leaderboard' component={Leaderboard} />
                </div>
          }
        </div>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    signedIn: authedUser === null,
    authedUser
  }
}

export default connect(mapStateToProps)(App)
