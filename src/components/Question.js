import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
    render () {
        const { authedUser, question, author, id, detailed } = this.props

        if (question === null)
            return <p>This question doesnot exists</p>
        
        return (
            <div>
                <p>
                    {detailed 
                        ? 
                            <span>{question.id}</span>
                        :
                            <Link to={`/question/${id}`}>{question.id}</Link>
                    }
                </p>
                <p>author:{author.name}</p>
                <p>time:{question.timestamp}</p>
                {
                    question.optionOne.votes.filter(v=> v===authedUser).length || 
                    question.optionTwo.votes.filter(v=> v===authedUser).length
                    ?
                        <span>
                            Selected: 
                            {question.optionOne.votes.filter(v=> v===authedUser).length 
                            ? question.optionOne.text
                            : question.optionTwo.text}
                        </span>
                    :
                    <span>
                        {detailed 
                            ?
                                <form>
                                    <input type="radio" name="gender" id="optionone" value="male" /> 
                                    <label htmlFor="optionone">{question.optionOne.text}</label>
                                    <input type="radio" name="gender" id="optiontwo" value="female" /> 
                                    <label htmlFor="optiontwo">{question.optionTwo.text}</label>
                                    <button type="submit">Submit</button>
                                </form>
                            :
                                null
                        }
                    </span>
                }
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