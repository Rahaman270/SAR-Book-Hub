import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import OnLoading from '../Loader'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const topRatedApiStatuses = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 786,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {topRatedApiStatus: topRatedApiStatuses.initial, topRatedBooks: []}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({topRatedApiStatus: topRatedApiStatuses.inProgress})

    const topRatedBooksApi = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(topRatedBooksApi, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const booksList = fetchedData.books
      const updatedData = booksList.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))
      this.setState({
        topRatedApiStatus: topRatedApiStatuses.success,
        topRatedBooks: updatedData,
      })
    } else {
      this.setState({topRatedApiStatus: topRatedApiStatuses.failure})
    }
  }

  onClickRetry = () => {
    this.getTopRatedBooks()
  }

  onClickFindBooks = () => {
    const {history} = this.props
    history.push('/shelf')
  }

  renderSliderSuccessView = () => {
    const {topRatedBooks} = this.state

    return (
      <Slider {...settings}>
        {topRatedBooks.map(eachBook => {
          const {id, title, coverPic, authorName} = eachBook

          return (
            <div key={id}>
              <Link to={`/books/${id}`} className="top_rated_btn">
                <img
                  className="top_rated_book_img"
                  src={coverPic}
                  alt={title}
                />
                <h1 className="top_rated_book_name">{title}</h1>
                <p className="top-rated-book-author">{authorName}</p>
              </Link>
            </div>
          )
        })}
      </Slider>
    )
  }

  renderSliderViewFailure = () => (
    <div className="top_rated_failure_div">
      <img
        className="top-rated-books-failure-image"
        src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
        alt="failure view"
      />

      <p className="top-rated-books-failure-heading">
        Something Went wrong. Please try again.
      </p>
      <button
        className="top_rated_failure_btn"
        onClick={this.onClickRetry}
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderSlider = () => {
    const {topRatedApiStatus} = this.state

    switch (topRatedApiStatus) {
      case topRatedApiStatuses.success:
        return <>{this.renderSliderSuccessView()}</>
      case topRatedApiStatuses.inProgress:
        return <OnLoading />
      case topRatedApiStatuses.failure:
        return <> {this.renderSliderViewFailure()}</>
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header home />
        <div className="home_main_div">
          <h1 className="home-heading" key="title">
            Find Your Next Favorite Books?
          </h1>
          <p className="home-paragraph">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button
            className="home_find_books_btn books_btn_sm"
            type="button"
            onClick={this.onClickFindBooks}
          >
            Find Books
          </button>
          <div>
            <div className="home_top_rated_div">
              <div className="top_rated_h1_div">
                <h1 className="top-rated-heading">Top Rated Books</h1>
                <button
                  className="home_find_books_btn books_btn_lg"
                  type="button"
                  onClick={this.onClickFindBooks}
                >
                  Find Books
                </button>
              </div>
              <div className="slick-container">{this.renderSlider()}</div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
