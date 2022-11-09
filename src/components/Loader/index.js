import Loader from 'react-loader-spinner'
import './index.css'

const OnLoading = () => (
  <div className="loader_div" testid="loader">
    <Loader type="TailSpin" color="#8284C7" height={50} width={50} />
  </div>
)

export default OnLoading
