import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Question from './Question';

class Dashboard extends Component {
    state = {
        value: 0,
    }

    handleChange = (event, value) => {
        this.setState({ value })
    }

    render () {
        const { value } = this.state;

        return (
            <div>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Unanswered Questions" />
                        <Tab label="Answered Questions" />
                    </Tabs>
                </AppBar>
                {value === 0 && 
                    <div>
                        {this.props.unansweredQuestionIds.map(id => (
                            <li key={id}>
                                <Question id={id} />
                            </li>
                        ))}
                    </div>
                }
                {value === 1 && 
                    <div>
                        {this.props.answeredQuestionIds.map(id => (
                            <li key={id}>
                                <Question id={id} />
                            </li>
                        ))}
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps ({ questions, authedUser, users }) {
    const answeredQuestionIds = Object.keys(users[authedUser].answers).sort((a,b)=>questions[b].timestamp-questions[a].timestamp)
    const unansweredQuestionIds = Object.keys(questions).filter(q => !answeredQuestionIds.includes(q)).sort((a,b)=>questions[b].timestamp-questions[a].timestamp)

    return {
        answeredQuestionIds,
        unansweredQuestionIds
    }
}

export default connect(mapStateToProps)(Dashboard)