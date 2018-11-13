import React from 'react'
import PropTypes from 'prop-types'

import './stylesheets/weekdays.scss'

const mapDays = (day) => {
  switch (day) {
    case 1:
      return 'Dom'
    case 2:
      return 'Seg'
    case 3:
      return 'Ter'
    case 4:
      return 'Qua'
    case 5:
      return 'Qui'
    case 6:
      return 'Sex'
    case 7:
      return 'Sáb'
    default:
      return ''
  }
}

const TablePaginator = ({ weekdays }) => (
  weekdays.map((day) => (
    <div className='weekday-box'>
      {mapDays(day)}
    </div>
  ))
)

TablePaginator.propTypes = {
  weekdays: PropTypes.array.isRequired
}

export default TablePaginator
