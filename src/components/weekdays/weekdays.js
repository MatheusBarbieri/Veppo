import React from 'react'
import PropTypes from 'prop-types'

import { getWeekDayName, getAbreviatedWeekDay } from '../../lib/moment.js'

import './stylesheets/weekdays.scss'

const TablePaginator = ({ weekdays }) => (
  weekdays.map((day) => (
    <div
      aria-label={getWeekDayName(day)}
      className='weekday-box'>
      {getAbreviatedWeekDay(day)}
    </div>
  ))
)

TablePaginator.propTypes = {
  weekdays: PropTypes.array.isRequired
}

export default TablePaginator
