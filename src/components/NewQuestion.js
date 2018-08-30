import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false
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
            optionTwo,
            toHome: true
        }))
        
    }

    render() {
        const { optionOne, optionTwo, toHome } = this.state

        if(toHome)
            return <Redirect to='/' />

        return (
            <div className="component-container">
                <Typography variant="title" gutterBottom>
                    Would you rather?
                </Typography>
                <form onSubmit={this.handleSubmit} className='form-container'>
                    <TextField
                        type="text"
                        label="Option One"
                        defaultValue={optionOne}
                        onChange={(e) => this.handleChange('optionOne',e)}
                        margin="normal"
                        fullWidth
                        autoFocus
                    />
                    <TextField
                        type="text"
                        label="Option Two"
                        defaultValue={optionTwo}
                        onChange={(e) => this.handleChange('optionTwo',e)}
                        margin="normal"
                        fullWidth
                    />
                    <Button variant="contained" color="primary" 
                        type="submit"
                        disabled={!optionOne || !optionTwo}
                    >
                        Add Poll
                    </Button>
                </form>
            </div>
        )
    }
}

export default connect()(NewQuestion)