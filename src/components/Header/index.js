import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  state = {showNav: false}

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  navUl = (dir, mar) => {
    const {home, shelve} = this.props
    const homeClass = home ? 'selectedTab' : ''
    const shelveClass = shelve ? 'selectedTab' : ''

    return (
      <ul className={`ul ${dir}`}>
        <Link to="/" className={mar}>
          <li className={homeClass} key="Home">
            Home
          </li>
        </Link>
        <Link to="/shelf" className={mar}>
          <li className={shelveClass} key="Shelve">
            BookShelves
          </li>
        </Link>

        <button
          className="logoutBtn"
          onClick={this.onClickLogout}
          type="button"
        >
          Logout
        </button>
      </ul>
    )
  }

  showHideNav = () => {
    this.setState(pre => ({
      showNav: !pre.showNav,
    }))
  }

  render() {
    const {showNav} = this.state
    return (
      <>
        <div className="HDR_maindiv">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dymk5ebdn/image/upload/v1667449562/Group_7731LOGO_pdhmmz.png"
              alt="website logo"
            />
          </Link>
          {this.navUl('ul_row', 'mar_r')}
          <img
            onClick={this.showHideNav}
            className="menu_icon"
            src="https://res.cloudinary.com/dymk5ebdn/image/upload/v1667464403/icon_wljjfk.png"
            alt="..."
          />
        </div>
        {showNav && <>{this.navUl('ul_col', 'mar_b')}</>}
      </>
    )
  }
}

export default withRouter(Header)
