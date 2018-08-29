import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class QuestionDetails extends Component {
    render() {
        return (
            <div>
                <Question id={this.props.match.params.id} detailed/>
            </div>
        )
    }
}

export default connect()(QuestionDetails)