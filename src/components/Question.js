import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
    render () {
        const { question, author, id } = this.props

        if (question === null)
            return <p>This question doesnot exists</p>
        
        return (
            <div>
                <p>
                    <Link to={`/question/${id}`}>{question.id}</Link>
                </p>
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

export default withRouter(connect(mapStateToProps)(Question))