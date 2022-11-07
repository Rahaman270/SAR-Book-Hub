import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="NF_main_div">
    <img
      src="https://res.cloudinary.com/dymk5ebdn/image/upload/v1667461338/Group_7484_f8grjn.png"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p>
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button">Go Back to Home</button>
    </Link>
  </div>
)

export default NotFound
