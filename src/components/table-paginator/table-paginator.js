import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const TablePaginator = (
  {
    handleChangePage,
    numberRoutes,
    rowsPerPage,
    currentPage
  }
) => (
  <div className='table-paginator'>
    <div className='table-paginator__left-navigator' />
    <div className='table-paginator__current-page' />
    <div className='table-paginator__right-navigator' />
  </div>
)

TablePaginator.propTypes = {
  handleChangePage: PropTypes.func.isRequired,
  numberRoutes: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  curretPage: PropTypes.number.isRequired
}

export default TablePaginator
