import React from 'react'
import PropTypes from 'prop-types'

import './stylesheets/routes-row.scss'

const RoutesEmptyRow = ({ numRoutes, rowsPerPage, page }) => {
  const totalPages = numRoutes / rowsPerPage
  const numEmptyRows = rowsPerPage - (numRoutes % rowsPerPage)
  const isLastPage = totalPages - page != 1

  return isLastPage ? null : (
    Array.from({ length: numEmptyRows }, () => (
      <div className='routes-row' />
    ))
  )
}

RoutesEmptyRow.propTypes = {
  page: PropTypes.number.isRequired,
  numRoutes: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
}

export default RoutesEmptyRow
