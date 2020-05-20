import React from 'react'
import DynamicComponent from './dynamic-component'
import theme from '../theme'

const { artifika } = theme.textStyles

export default ({ children }) => (
  <DynamicComponent {...artifika} {...props}>
    {children}
  </DynamicComponent>
)
