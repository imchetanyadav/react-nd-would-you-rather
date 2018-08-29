import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: ''
    }

    handleChange = (option,e) => {
        const input = e.target.value

        this.setState(() => ({ 
            [option]: input
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOne, optionTwo } = this.state
        const { dispatch } = this.props

        dispatch(handleAddQuestion(optionOne, optionTwo))

        this.setState(() => ({
            optionOne,
            optionTwo
        }))
    }

    render() {
        const { optionOne, optionTwo } = this.state

        // Redirect to dashboard

        return (
            <div>
                Would you rather?
                <form onSubmit={this.handleSubmit}>
                    <input type="text" defaultValue={optionOne} onChange={(e) => this.handleChange('optionOne',e)} />
                    <input type="text" defaultValue={optionTwo} onChange={(e) => this.handleChange('optionTwo',e)} />
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}

export default connect()(NewQuestion)