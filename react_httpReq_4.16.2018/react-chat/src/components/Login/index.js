import React from 'react'
import './_login.css'

class Login extends React.Component {
  constructor(){
    super()
    this.state = {
      userName: ''
    }

    this.loginInputChange = this.loginInputChange.bind(this)
  }

  render() {
    return (
      <div className='login'>
        <form className='loginForm'
              onSubmit={(e) => this.submission(e, this.state.userName)}>
          <input
            className='input'
            type='text'
            name='userName'
            value={this.state.userName}
            onChange={this.loginInputChange}
            placeholder='please enter a username'
            autoComplete = 'off'
          />
          <input
            type='submit'
            value='Log In'
          />
        </form>
      </div>
    )
  }

  loginInputChange(e) {
    this.setState({ userName: e.target.value })
  }

  submission(e, userName) {
    e.preventDefault()
    this.props.login(userName)
  }
}

export default Login
