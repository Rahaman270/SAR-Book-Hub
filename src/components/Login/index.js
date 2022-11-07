import {Redirect} from 'react-router-dom'

import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    showErr: false,
    errMsg: '',
    username: '',
    password: '',
  }

  onUsernameChange = e => {
    this.setState({username: e.target.value})
  }

  onPasswordChange = e => {
    this.setState({password: e.target.value})
  }

  onLoginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onFormSubmit = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.setState({showErr: true, errMsg: data.error_msg})
      console.log(data.error_msg)
    }
  }

  render() {
    const {showErr, errMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main_div">
        <img
          className="main_img1"
          src="https://res.cloudinary.com/dymk5ebdn/image/upload/v1667448463/Rectangle_1467LoginBSI_q4s7uh.png"
          alt="website login"
        />
        <div className="login_div">
          <form onSubmit={this.onFormSubmit}>
            <img
              className="main_img2"
              src="https://res.cloudinary.com/dymk5ebdn/image/upload/v1667458200/Ellipse_99_mjr0li.png"
              alt="..."
            />
            <img
              className="logo"
              src="https://res.cloudinary.com/dymk5ebdn/image/upload/v1667449562/Group_7731LOGO_pdhmmz.png"
              alt="login website logo"
            />
            <label htmlFor="username">Username*</label>
            <input
              type="text"
              id="username"
              placeholder="User Name"
              onChange={this.onUsernameChange}
              value={username}
              required
            />
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={this.onPasswordChange}
              value={password}
              required
            />
            {showErr && <p className="errMsg">{errMsg}</p>}
            <button className="btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
