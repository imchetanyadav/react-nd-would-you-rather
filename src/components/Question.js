import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Error from './Error'
import { handleAddQuestionAnswer } from '../actions/questions'

class Question extends Component {
    state={
        selected: ''
    }

    handleOptionSelect = (value) => {
        this.setState(()=> ({
            selected: value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { selected } = this.state
        const { dispatch, id } = this.props

        dispatch(handleAddQuestionAnswer(id, selected))

    }

    render () {
        const { question, author, authedUserDetails, id, detailed } = this.props

        if (!question)
            return <Error />
        
        return (
            <Paper className='question-container'>
                {detailed ?
                    <Typography variant="title">
                        Would you rather <b>{question.optionOne.text}</b> or <b>{question.optionTwo.text}</b>
                    </Typography>
                :
                    <Link to={`/questions/${id}`} style={{textDecoration: 'none'}}>
                        <Typography variant="title">
                            Would you rather <b>{question.optionOne.text}</b> or <b>{question.optionTwo.text}</b>
                        </Typography>
                    </Link>
                }
                <div className='question-author-details'>
                    <Avatar alt={author.name+' profile picture'} src={author.avatarURL} className="select-avatar" />
                    <Typography variant="subheading">
                        {author.name} | {' '}
                        {new Date(question.timestamp).toLocaleDateString()}
                    </Typography>
                </div>
                {authedUserDetails.answers[question.id]
                    ?
                        <div>
                            <Typography variant="subheading" color="primary">
                                You selected <b>{question[authedUserDetails.answers[question.id]].text}</b>
                            </Typography>
                            {detailed &&
                                <div>
                                    Results:
                                    {question.optionOne.text}
                                    <ul>
                                        <li>Votes: {question.optionOne.votes.length}</li>
                                        <li>Percentage: {(question.optionOne.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100}%</li>
                                    </ul>
                                    {question.optionTwo.text}
                                    <ul>
                                        <li>Votes: {question.optionTwo.votes.length}</li>
                                        <li>Percentage: {(question.optionTwo.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100}%</li>
                                    </ul>
                                </div>
                            }
                        </div>
                    :
                    <span>
                        {detailed
                            ?
                                <form onSubmit={this.handleSubmit}>
                                    <input type="radio" name="gender" id="optionone" value="optionOne" onChange={(e)=>this.handleOptionSelect(e.currentTarget.value)} /> 
                                    <label htmlFor="optionone">{question.optionOne.text}</label>
                                    <input type="radio" name="gender" id="optiontwo" value="optionTwo" onChange={(e)=>this.handleOptionSelect(e.currentTarget.value)} /> 
                                    <label htmlFor="optiontwo">{question.optionTwo.text}</label>
                                    <button type="submit">Submit</button>
                                </form>
                            :
                                null
                        }
                    </span>
                }
            </Paper>
        )
    }
}

function mapStateToProps ({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    const author = question ? users[question.author] : ''
    const authedUserDetails = users[authedUser]

    return {
        question,
        author,
        authedUserDetails
    }
}

export default withRouter(connect(mapStateToProps)(Question))