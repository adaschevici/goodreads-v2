import React from 'react'
import { Box, Flex } from 'rebass'
import { Link } from 'react-router-dom'
import { typography } from '../../typography'

const { Artifika } = typography

export default () => (
  <Flex px={2} color="white" bg="black" alignItems="center">
    <Link to="/">
      <Artifika p={2} fontWeight="bold">
        DashBoard
      </Artifika>
    </Link>
    <Box mx="auto" />
    <Link to="/login">
      <Artifika p={2} fontWeight="bold">
        Login
      </Artifika>
    </Link>
  </Flex>
)
