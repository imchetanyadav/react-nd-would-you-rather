import React, { Component } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

class Leaderboard extends Component {
    render() {
        const { authedUser, leaderboardData } = this.props

        return (
            <div className='component-container'>
                <Typography variant="title">
                    Leaderboard
                </Typography>
                <br />
                <Paper>
                    <List style={{padding: '1rem 0'}}>
                        {leaderboardData ? 
                            leaderboardData.map(user => (
                                    <div key={user.id} style={{background: user.id === authedUser ? 'yellow' : 'none'}}>
                                        <ListItem>
                                            <Avatar alt={user.name} src={user.avatarURL}></Avatar>
                                            <ListItemText primary={user.name} secondary={
                                                <span>
                                                    <span>Answered Questions: {user.answeredQuestions}</span> {' | '}
                                                    <span>Created Questions: {user.createdQuestions}</span>
                                                </span>
                                            } />
                                            <ListItemSecondaryAction style={{marginRight: '2rem'}}>
                                                <Typography variant="title">
                                                    {user.answeredQuestions+user.createdQuestions}
                                                </Typography>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider inset component="li"  />
                                    </div>                                
                                ))
                                : null
                            }
                    </List>
                </Paper>
            </div>
        )
    }
}


function mapStateToProps ({ authedUser, users, questions }) {
    const leaderboardData = Object.keys(users).map(user => ({
        id: user,
        name: users[user].name,
        avatarURL: users[user].avatarURL,
        answeredQuestions: Object.keys(users[user].answers).length,
        createdQuestions: Object.keys(questions).filter(q => questions[q].author === user).length
    })).sort((a,b) => (b.answeredQuestions+b.createdQuestions)-(a.answeredQuestions+a.createdQuestions))

    return {
        authedUser,
        leaderboardData
    }
}


export default connect(mapStateToProps)(Leaderboard)