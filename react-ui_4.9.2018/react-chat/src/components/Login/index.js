import React from 'react'
import './_login.css'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  render() {
    return (
      <div className='login'>
        <form className='loginForm'
              onSubmit={(e) => this.submission(e)}>
          <input
            type='text'
            name='username'
            value={this.state.username}
            onChange={this.handleInputChange}
            plaecholder='Enter A Username'
            autoComplete='off'
          />
          <input
            type='submit'
            value='Log In'
          />
        </form>
      </div>
    )
  }

  handleInputChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  submission(e) {
    e.preventDefault()
    this.props.login(this.state.username)
  }
}

export default Login
