import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Dashboard extends Component {
    state = {
        value: 0,
    }

    handleChange = (event, value) => {
        this.setState({ value })
    }
    render () {
        console.log(this.props)
        const { value } = this.state;
        return (
            <div>
                Dashboard
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Unanswered Questions" />
                        <Tab label="Answered Questions" />
                    </Tabs>
                </AppBar>
                {value === 0 && 
                    <div>
                        {this.props.questionIds.map(id => (
                            <li key={id}>
                                <div>Question Id: {id}</div>
                            </li>
                        ))}
                    </div>
                }
                {value === 1 && 
                    <div>Item Two</div>
                }
            </div>
        )
    }
}

function mapStateToProps ({ questions }) {
    return {
        questionIds: Object.keys(questions)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard)