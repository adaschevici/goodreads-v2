import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  fetchMeta,
  fetchImages,
  fetchRatings,
  fetchBooksInProgress,
} from './actions'
import { connect } from 'react-redux'
import { components } from '@goodreads-v2/component-library'

const { BookGrid, BookCard } = components

class BookList extends Component {
  static defaultProps = {
    fetchMeta: () => {},
    images: [],
    ratings: [],
  }
  static propTypes = {
    fetchMeta: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    const { dispatch, username } = this.props
    dispatch(fetchMeta())
    dispatch(fetchRatings())
    dispatch(fetchImages())
    dispatch(fetchBooksInProgress(username))
  }

  render() {
    const { meta, images, ratings, authenticated } = this.props
    const books = meta.map((bookMeta, idx) => ({
      ...bookMeta,
      ...images[idx],
      ...ratings[idx],
    }))
    return (
      <BookGrid>
        {books.map((book) => (
          <BookCard
            key={`${book.id}${book.title}`}
            authenticated={authenticated}
            {...book}
          />
        ))}
      </BookGrid>
    )
  }
}

function mapStateToProps(state) {
  const {
    meta,
    ratings,
    images,
    isLoadingImages,
    isLoadingRatings,
    isLoadingMeta,
    errorRatings,
    errorMeta,
    errorImages,
  } = state.books
  const { username, error: authError } = state.auth
  const authenticated = authError === null
  return {
    meta,
    ratings,
    images,
    isLoadingImages,
    isLoadingRatings,
    isLoadingMeta,
    errorRatings,
    errorImages,
    errorMeta,
    username,
    authenticated,
  }
}

export default connect(mapStateToProps)(BookList)
