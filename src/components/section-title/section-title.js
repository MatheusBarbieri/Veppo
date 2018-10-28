import React from 'react'
import PropTypes from 'prop-types'

import './stylesheets/section-title.scss'

const SectionTitle = ({ label }) => (
  <h1 className='section-title'>
    {label}
  </h1>
)

SectionTitle.propTypes = {
  label: PropTypes.string
}

SectionTitle.defaultProps = {
  label: ''
}

export default SectionTitle
