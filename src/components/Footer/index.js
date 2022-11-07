import {FaGoogle, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer_div">
    <div>
      <FaGoogle className="footer_icons" />
      <FaTwitter className="footer_icons" />
      <FaInstagram className="footer_icons" />
      <FaYoutube className="footer_icons" />
    </div>
    <p className="footer_heading">Contact Us</p>
  </div>
)

export default Footer
