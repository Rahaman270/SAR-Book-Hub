import './index.css'

const FailurePage = props => {
  const {onClickTryAgin} = props

  const onClickTry = () => {
    onClickTryAgin()
  }

  return (
    <div className="failure_div">
      <img
        src="https://res.cloudinary.com/saikrishnaboga-ccbp-tech/image/upload/v1643992995/Book-Hub%20/Group_7522failureView_xgsn7l.png"
        alt="failure view"
        className="book_failure_image"
      />
      <p className="book_failure_message">
        Something went wrong. Please try again
      </p>
      <button type="button" className="try_again_btn" onClick={onClickTry}>
        Try Again
      </button>
    </div>
  )
}

export default FailurePage
