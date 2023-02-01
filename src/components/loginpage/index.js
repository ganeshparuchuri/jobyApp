import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', warningMsg: false}

  submitSuccessFull = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  submitFailure = error => {
    this.setState({warningMsg: true}, error)
  }

  formSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccessFull(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, warningMsg} = this.state
    console.log(warningMsg)
    const jwttoken = Cookies.get('jwt_token')
    if (jwttoken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-page-container">
          <img
            className="web-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="form-container" onSubmit={this.formSubmit}>
            <label className="label-name" htmlFor="username">
              USERNAME
            </label>
            <input
              value={username}
              onChange={this.onChangeUsername}
              placeholder="Username"
              id="username"
              type="text"
              className="user-input"
            />
            <label className="label-name" htmlFor="password">
              PASSWORD
            </label>
            <input
              value={password}
              onChange={this.onChangePassword}
              placeholder="Username"
              id="password"
              type="password"
              className="user-input"
            />
            <button className="login-btn" type="submit">
              Login
            </button>
            {warningMsg && (
              <p className="error-wraning">*Username or password is invalid</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
