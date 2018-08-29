import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
    render () {
        const { question, author } = this.props

        if (question === null)
            return <p>This question doesnot exists</p>
        
        return (
            <div>
                <p>id:{question.id}</p>
                <p>author:{author.name}</p>
                <p>time:{question.timestamp}</p>
                <p>Option1:{question.optionOne.text}</p>
                <p>Option2:{question.optionTwo.text}</p>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    const author = users[question.author]

    return {
        authedUser,
        question,
        author
    }
}

export default connect(mapStateToProps)(Question)