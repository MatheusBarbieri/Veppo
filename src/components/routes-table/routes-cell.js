import React from 'react'
import PropTypes from 'prop-types'

import './stylesheets/routes-cell.scss'

const RoutesCell = ({ children, className }) => (
  <div tabIndex='-1' className={`routes-cell ${className}`}>
    {children}
  </div>
)

RoutesCell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

RoutesCell.defaultProps = {
  className: ''
}

export default RoutesCell
