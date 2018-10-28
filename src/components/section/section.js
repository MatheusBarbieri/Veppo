import React from 'react'
import PropTypes from 'prop-types'

import './stylesheets/section.scss'

const SectionTitle = ({ children }) => (
  <div className='section'>
    {children}
  </div>
)

SectionTitle.propTypes = {
  children: PropTypes.object
}

SectionTitle.defaultProps = {
  children: null
}

export default SectionTitle
