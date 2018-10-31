import React from 'react'
import PropTypes from 'prop-types'

import './stylesheets/section.scss'

const Section = ({ children }) => (
  <div className='section'>
    {children}
  </div>
)

Section.propTypes = {
  children: PropTypes.array
}

Section.defaultProps = {
  children: null
}

export default Section
