import {Link, withRouter} from 'react-router-dom'
import {FaHome, FaHistory} from 'react-icons/fa'
import {IoMdLogOut} from 'react-icons/io'
import './index.css'

const Header = props => {
  const {location} = props

  return (
    <div className="nav-bar">
      <img
        src="https://res.cloudinary.com/dwma8dkv0/image/upload/v1719837097/a9w6thfdqx3hs0xbk4gg.jpg"
        alt="logo"
        className="logo"
      />
      <div className="nav-options-mobile-view">
        <Link to="/">
          <button
            type="button"
            className={`nav-link ${
              location.pathname === '/' ? 'active-mobile' : ''
            }`}
          >
            <FaHome />
          </button>
        </Link>
        <Link to="/history">
          <button
            type="button"
            className={`nav-link ${
              location.pathname === '/history' ? 'active-mobile' : ''
            }`}
          >
            <FaHistory />
          </button>
        </Link>
        <button type="button" className="nav-link">
          <IoMdLogOut />
        </button>
      </div>
      <div className="nav-options-desktop-view">
        <Link to="/">
          <button
            type="button"
            className={`nav-link-desktop ${
              location.pathname === '/' ? 'active-desktop' : ''
            }`}
          >
            Home
          </button>
        </Link>
        <Link to="/history">
          <button
            type="button"
            className={`nav-link-desktop ${
              location.pathname === '/history' ? 'active-desktop' : ''
            }`}
          >
            History
          </button>
        </Link>
      </div>
      <button type="button" className="desktop-logout-btn">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
