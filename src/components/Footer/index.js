import {
  FaGoogle,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
} from 'react-icons/fa'
import {IoMail} from 'react-icons/io5'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="media-section">
      <div className="social-media">
        <button type="button" className="media-btn">
          <FaGoogle className="media-icon" />
        </button>
        <button type="button" className="media-btn">
          <FaTwitter className="media-icon" />
        </button>
        <button type="button" className="media-btn">
          <FaInstagram className="media-icon" />
        </button>
        <button type="button" className="media-btn">
          <FaLinkedin className="media-icon" />
        </button>
      </div>
      <p className="media-para">37, Ayur Vigyan Nagar, New Delhi, India</p>
    </div>
    <div className="footer-details-section">
      <div className="contact-us-section">
        <h1 className="contact-section-heading">Contact Us</h1>
        <div className="contact-item">
          <IoMail className="contact-icon" />
          <p>rohit@gmail.com</p>
        </div>
        <div className="contact-item">
          <FaPhoneAlt className="contact-icon" />
          <p>9346977071</p>
        </div>
      </div>
      <div className="help-section">
        <h1 className="contact-section-heading">Let Us Help You</h1>
        <p className="help-para">100% Purchase</p>
        <p className="help-para">Protection</p>
        <p className="help-para">Your Account</p>
        <p className="help-para">Return Center</p>
        <p className="help-para">Help</p>
      </div>
    </div>
  </div>
)

export default Footer
