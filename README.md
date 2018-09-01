# Would You Rather Project

This is the starter code for the final assessment project for Udacity's React & Redux course.

## Folder Structure
```bash
├── README.md - This file.
├── package.json # Package manager file.
├── public
│   ├── favicon.ico # React Icon,
│   └── index.html # Base html structure
│   └── manifest.json # Manifest file.
└── src
    ├── actions # Redux Actions
    │   ├── authedUser.js # actions related to authedUser
    │   ├── questions.js # actions related to questions
    │   ├── shared.js # shared actions
    │   ├── users.js # actions related to users
    ├── components # React Components
    │   ├── App.js # handles which component to render
    │   ├── Dashboard.js # contains details about user's answered and unanswered questions
    │   ├── Error.js # show 404 error when page does not exists
    │   ├── Leaderboard.js # show user standings based on their interaction with app
    │   ├── Navbar.js # contains link to different pages and logged in user
    │   ├── NewQuestion.js # allow logged in user to add new question
    │   ├── Question.js # contain details about a particular question
    │   ├── QuestionDetails.js # complete question details
    │   ├── Signin.js # allow user to sign in with one of the registered user
    ├── middleware # Redux Middlewares
    │   ├── index.js # apply thunk and logger middleware
    │   ├── logger.js # log action and new state
    ├── reducers # Redux Reducers
    │   ├── authedUser.js # reducer for authedUser
    │   ├── index.js # combine reducers
    │   ├── questions.js # reducer for questions
    │   ├── users.js # reducer for to users
    ├── utils # Utility files
    │   ├── _DATA.js # api for this project
    │   ├── api.js # functions that connect with api
    │   ├── helpers.js # helper function for api
    ├── index.css # Global styles.
    └── index.js # Used for DOM rendering only.
```

## Instructions
Run yarn install to install all the dependencies for this project and yarn start to start the project server.

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|
