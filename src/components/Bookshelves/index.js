import Cookies from 'js-cookie'
import {BsFillStarFill, BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import {Component} from 'react'
import Header from '../Header'
import FailurePage from '../FailurePage'
import Footer from '../Footer'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]
const Statuses = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookshelves extends Component {
  state = {
    booksList: [],
    apiStatus: Statuses.inProgress,
    shelveTitle: 'All Books',
    selectedShelveId: bookshelvesList[0].id,
  }

  componentDidMount() {
    this.setState({apiStatus: Statuses.inProgress})
    this.getBooks()
  }

  getBooks = async (searchShelf = 'ALL', searchValue = '') => {
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${searchShelf}&search=${searchValue}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const allBooks = data.books.map(eachBook => ({
        id: eachBook.id,
        title: eachBook.title,
        readStatus: eachBook.read_status,
        rating: eachBook.rating,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
      }))
      this.setState({booksList: allBooks, apiStatus: Statuses.success})
    } else {
      this.setState({apiStatus: Statuses.failure})
    }
  }

  onClickTryAgin = () => {
    this.setState({apiStatus: Statuses.inProgress})
    this.getBooks()
  }

  noMatches = () => {
    const {searchValue} = this.state
    return (
      <div className="no_match_found_div">
        <img
          className="no_match_img"
          src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
          alt="no books"
        />
        <p className="no_match_para">
          Your search for {searchValue} did not find any matches.
        </p>
      </div>
    )
  }

  booksSuccess = () => {
    const {booksList} = this.state

    return (
      <ul className="shelves_content_div">
        {booksList.map(each => (
          <Link to={`/books/${each.id}`} className="link">
            <li className="booksCard" key={each.id}>
              <img
                className="books_cover_img"
                src={each.coverPic}
                alt={each.title}
              />
              <div className="book_details_div">
                <h1 className="book_title">{each.title}</h1>
                <p className="author_name">{each.authorName}</p>
                <div className="rating_div">
                  <p className="book_rating">Avg Rating</p>
                  <BsFillStarFill className="book_star_icon" />
                  <p className="book_rating">{each.rating}</p>
                </div>
                <p className="book_status_text">
                  Status:{' '}
                  <span className="book_reading_status">{each.readStatus}</span>
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  onShelvesClick = e => {
    const shelf = bookshelvesList.filter(each => each.id === e.target.id)
    this.setState({
      apiStatus: Statuses.inProgress,
      shelveTitle: `${shelf[0].label} Books`,
      selectedShelveId: shelf[0].id,
    })
    this.getBooks(shelf[0].value)
  }

  renderPage = () => {
    const {booksList, apiStatus} = this.state

    switch (apiStatus) {
      case Statuses.success:
        if (booksList.length > 0) {
          return <>{this.booksSuccess()}</>
        }
        return <>{this.noMatches()}</>
      case Statuses.inProgress:
        return <>{this.booksOnProgress()}</>
      case Statuses.failure:
        return <FailurePage onClickTryAgin={this.onClickTryAgin} />

      default:
        return null
    }
  }

  booksOnProgress = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#8284C7" height={50} width={50} />
    </div>
  )

  onInputValueChange = e => {
    this.setState({searchValue: e.target.value})
  }

  onSearchIconClick = () => {
    this.setState({apiStatus: Statuses.inProgress})
    const {searchShelf, searchValue} = this.state
    this.getBooks(searchShelf, searchValue)
  }

  searchBarItems = () => {
    const {searchValue} = this.state
    return (
      <>
        <input
          className="searchBox"
          type="search"
          onChange={this.onInputValueChange}
          value={searchValue}
        />
        <button
          testid="searchButton"
          type="button"
          onClick={this.onSearchIconClick}
        >
          <BsSearch />
        </button>
      </>
    )
  }

  render() {
    const {shelveTitle, selectedShelveId} = this.state
    return (
      <>
        <Header />

        <div className="shelves_main_div">
          <div className="mob_search_div searchDiv">
            {this.searchBarItems()}
          </div>
          <ul className="side_bar">
            <h1 className="shelves_list">Bookshelves</h1>
            {bookshelvesList.map(each => {
              const classforselectedShelve =
                selectedShelveId === each.id ? 'classforselectedShelve' : ''

              return (
                <button
                  type="button"
                  id={each.id}
                  onClick={this.onShelvesClick}
                  className={`shelves_list links ${classforselectedShelve}`}
                >
                  {each.label}
                </button>
              )
            })}
          </ul>

          <div className="content_div">
            <div className="searchDiv pc_search_div">
              <h1>{shelveTitle}</h1>
              {this.searchBarItems()}
            </div>
            {this.renderPage()}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Bookshelves
