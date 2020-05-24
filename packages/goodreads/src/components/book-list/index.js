import React, { Component, Fragment } from 'react'
import { fetchBooks } from './actions'
import { connect } from 'react-redux'
import { components, typography } from '@goodreads-v2/component-library'

const { BookGrid, BookCard } = components
const { Artifika, Body } = typography

class BookList extends Component {
  static defaultProps = {
    images: [],
    ratings: [],
  }

  componentDidMount = () => {
    const { dispatch } = this.props
    dispatch(fetchBooks())
  }

  render() {
    const { meta, images, ratings, authenticated } = this.props
    const books = meta.map((bookMeta, idx) => ({
      ...bookMeta,
      ...images[idx],
      ...ratings[idx],
    }))
    const booksInProgress = []
    return (
      <Fragment>
        {authenticated && (
          <Fragment>
            <Artifika>Currently reading</Artifika>
            {booksInProgress.length ? (
              <BookGrid>
                {booksInProgress.map((book) => (
                  <BookCard
                    key={`${book.id}${book.title}`}
                    authenticated={authenticated}
                    {...book}
                  />
                ))}
              </BookGrid>
            ) : (
              <div>
                <Body tag="h6">Nothing to show here...yet :(</Body>
              </div>
            )}
          </Fragment>
        )}
        <Artifika>Books</Artifika>
        <BookGrid>
          {books.map((book) => (
            <BookCard
              key={`${book.id}${book.title}`}
              authenticated={authenticated}
              {...book}
            />
          ))}
        </BookGrid>
      </Fragment>
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
