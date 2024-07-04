import {Component} from 'react'
import './index.css'

class LoginPage extends Component {
  state = {email: '', password: '', showSubmitError: false}

  onChangeEmail = event => this.setState({email: event.target.value})

  onnChangePassword = event => this.setState({password: event.target.value})

  logToRegister = () => {
    const {history} = this.props
    history.push('/register')
  }

  onSubmitLoginForm = event => {
    event.preventDefault()
  }

  render() {
    const {showSubmitError, email, password} = this.state
    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onSubmitLoginForm}>
          <img
            src="https://res-console.cloudinary.com/dwma8dkv0/media_explorer_thumbnails/ede3c8c94dc9fc8c7ddf84329a92ba80/detailed"
            alt="logo"
            className="login-page-img"
          />
          <div className="form-content">
            <div className="input-set">
              <label className="label" htmlFor="email">
                EMAIL
              </label>
              <br />
              <input
                className="input"
                value={email}
                onChange={this.onChangeEmail}
                placeholder="Email"
                type="text"
                id="email"
              />
            </div>
            <div className="input-set">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <br />
              <input
                className="input"
                value={password}
                onChange={this.onnChangePassword}
                placeholder="Password"
                type="password"
                id="password"
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            {showSubmitError && <p className="error-message">Error</p>}
            <p className="create-account" onClick={this.logToRegister}>
              Create Account
            </p>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginPage
