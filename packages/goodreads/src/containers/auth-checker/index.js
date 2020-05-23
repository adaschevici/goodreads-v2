import { Component } from 'react'
import { checkAuth } from './actions'
import { connect } from 'react-redux'

class AuthCheck extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    return dispatch(checkAuth())
  }

  render() {
    const { children } = this.props
    return children
  }
}

const mapStateToProps = ({ username }) => {
  return { username }
}

export default connect(mapStateToProps)(AuthCheck)
