import {Component} from 'react'
import './index.css'

class RegisterPage extends Component {
  state = {
    username: '',
    mobile: '',
    email: '',
    password: '',
  }

  onChange = e => {
    this.setState({[e.target.id]: e.target.value})
  }

  onSubmitRegisterForm = event => {
    event.preventDefault()
  }

  render() {
    const {username, mobile, email, password} = this.state
    return (
      <div className="register-container">
        <form className="form-container" onSubmit={this.onSubmitRegisterForm}>
          <img
            src="https://res-console.cloudinary.com/dwma8dkv0/media_explorer_thumbnails/ede3c8c94dc9fc8c7ddf84329a92ba80/detailed"
            alt="logo"
            className="login-page-img"
          />
          <div className="register-form-content">
            <h1 className="register-heading">Register Here</h1>
            <div className="input-set">
              <label className="label" htmlFor="username">
                Username
              </label>
              <br />
              <input
                value={username}
                className="input"
                onChange={this.onChange}
                placeholder="username"
                type="text"
                id="username"
              />
            </div>
            <div className="input-set">
              <label className="label" htmlFor="mobile">
                Mobile
              </label>
              <br />
              <input
                value={mobile}
                className="input"
                onChange={this.onChange}
                placeholder="Mobile"
                type="tel"
                id="mobile"
              />
            </div>
            <div className="input-set">
              <label className="label" htmlFor="email">
                Email
              </label>
              <br />
              <input
                value={email}
                className="input"
                onChange={this.onChange}
                placeholder="Email"
                type="text"
                id="email"
              />
            </div>
            <div className="input-set">
              <label className="label" htmlFor="password">
                Password
              </label>
              <br />
              <input
                value={password}
                className="input"
                onChange={this.onChange}
                placeholder="Password"
                type="password"
                id="password"
              />
            </div>
            <button type="submit" className="login-btn">
              Register
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default RegisterPage
