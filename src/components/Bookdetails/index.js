import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import OnLoading from '../Loader'

import Header from '../Header'
import FailurePage from '../FailurePage'
import Footer from '../Footer'

import './index.css'

const Statuses = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookdetails extends Component {
  state = {
    bookDetails: [],
    pageStatus: Statuses.inProgress,
  }

  componentDidMount() {
    this.getBookDetails()
    this.setState({pageStatus: Statuses.inProgress})
  }

  getBookDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        id: data.book_details.id,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        aboutBook: data.book_details.about_book,
        rating: data.book_details.rating,
        aboutAuthor: data.book_details.about_author,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }

      this.setState({bookDetails: updatedData, pageStatus: Statuses.success})
    } else {
      this.setState({pageStatus: Statuses.failure})
    }
  }

  onClickTryAgin = () => {
    this.getBookDetails()
    this.setState({pageStatus: Statuses.inProgress})
  }

  renderPage = () => {
    const {pageStatus} = this.state

    switch (pageStatus) {
      case Statuses.inProgress:
        return <OnLoading />
      case Statuses.success:
        return (
          <div className="details_main_div">{this.bookFetchSuccessful()}</div>
        )
      case Statuses.failure:
        return <FailurePage onClickTryAgin={this.onClickTryAgin} />

      default:
        return null
    }
  }

  bookFetchSuccessful = () => {
    const {bookDetails} = this.state
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      aboutAuthor,
      title,
    } = bookDetails
    return (
      <>
        <div className="upper_details_div">
          <img className="book_img" alt={title} src={coverPic} />
          <div className="details_div">
            <h1 className="title" key={title}>
              {title}
            </h1>
            <p className="book_author_name">{authorName}</p>
            <div className="rating_div">
              <p className="book_details_rating">Avg rating</p>
              <BsFillStarFill className="star_icon" />
              <p className="book_details_rating">{rating}</p>
            </div>
            <p className="book_status_heading">
              Status: <span className="book_status">{readStatus}</span>
            </p>
          </div>
        </div>

        <div className="about_container">
          <hr className="hr_line" />
          <h1>About Author</h1>
          <p>{aboutAuthor}</p>
          <h1>About Book</h1>
          <p>{aboutBook}</p>
        </div>
      </>
    )
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderPage()}
        <Footer />
      </div>
    )
  }
}

export default Bookdetails
