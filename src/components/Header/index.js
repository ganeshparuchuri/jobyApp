import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

import './index.css'

const Header = props => {
  const logutButton = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <Link to="/">
          <img
            className="web-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="responsive-navbar">
          <Link to="/" className="links">
            <li className="list">Home</li>
          </Link>
          <li className="list">Jobs</li>
        </ul>

        <button onClick={logutButton} className="logout" type="button">
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
