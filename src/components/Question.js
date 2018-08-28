import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
    render () {
        const { question } = this.props
        
        return (
            <div>
                <p>id:{question.id}</p>       
                <p>author:{question.author}</p>       
                <p>time:{question.timestamp}</p>       
                <p>Option1:{question.optionOne.text}</p>       
                <p>Option2:{question.optionTwo.text}</p>       
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, users, questions }, { id }) {
    const question = questions[id]

    return {
        authedUser,
        question
    }
}

export default connect(mapStateToProps)(Question)