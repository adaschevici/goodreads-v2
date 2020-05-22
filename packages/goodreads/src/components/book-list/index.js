import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchMeta, fetchImages, fetchRatings } from './actions'
import { connect } from 'react-redux'
import { components } from '@goodreads-v2/component-library'
import faker from 'faker'

const { BookGrid } = components

const books = (howMany = 10) => {
  let books = []
  faker.seed(1234)
  for (let i = 0; i < howMany; i++) {
    books.push({
      image: `https://picsum.photos/400/200?random=${i}`,
      title: `${faker.lorem.words(3)}`,
      description: `${faker.lorem.paragraph()}`,
      rating: `${faker.random.number({ min: 1, max: 5, precision: 0.01 })}`,
      bookId: `${faker.random.alphaNumeric(13)}`,
      onStarted: () => console.log('started'),
    })
  }
  return books
}

class BookList extends Component {
  static defaultProps = {
    fetchMeta: () => {},
  }
  static propTypes = {
    fetchMeta: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    const { dispatch } = this.props
  }

  render() {
    const { meta, rating, images } = this.props
    console.log(meta)
    console.log(rating)
    console.log(images)
    console.log(books())
    return <BookGrid books={books()} />
  }
}

function mapStateToProps(state) {
  const { meta, isLoading, error } = state.books.meta
  return { meta, isLoading, error }
}

export default connect(mapStateToProps)(BookList)
