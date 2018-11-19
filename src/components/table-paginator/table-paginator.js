import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { NavigateNext, NavigateBefore } from '@material-ui/icons'

import './stylesheets/table-paginator.scss'

const TablePaginator = (
  {
    handleChangePage,
    numberRoutes,
    rowsPerPage,
    currentPage
  }
) => {
  const remainder = numberRoutes % rowsPerPage
  const numPages = (numberRoutes - remainder) / rowsPerPage - (remainder === 0 ? 1 : 0)

  const handleEvent = (to) => {
    if (to >= 0 && to <= numPages) {
      handleChangePage(to)
    }
  }

  const handleClickNavigate = (event, to) => {
    handleEvent(to)
  }

  const handleSpacebarNavigate = (event, to) => {
    if (event.charCode === 32 || event.keyCode === 32) {
      event.preventDefault()
      handleEvent(to)
    }
  }

  const leftNavigator = classnames('table-paginator__left-navigator', {
    'table-paginator__left-navigator__off': currentPage === 0
  })

  const rightNavigator = classnames('table-paginator__right-navigator', {
    'table-paginator__right-navigator__off': currentPage === numPages
  })

  return (
    <div className='table-paginator'>
      <button
        type='button'
        className={leftNavigator}
        onClick={(event) => handleClickNavigate(event, currentPage - 1)}
        onKeyDown={(event) => handleSpacebarNavigate(event, currentPage - 1)}>
        <NavigateBefore />
      </button>

      <div className='table-paginator__current-page'>
        {`Página: ${currentPage + 1} de ${numPages + 1}`}
      </div>

      <button
        type='button'
        className={rightNavigator}
        onClick={(event) => { handleClickNavigate(event, currentPage + 1) }}
        onKeyDown={(event) => { handleSpacebarNavigate(event, currentPage + 1) }}>
        <NavigateNext />
      </button>
    </div>
  )
}

TablePaginator.propTypes = {
  handleChangePage: PropTypes.func.isRequired,
  numberRoutes: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default TablePaginator
