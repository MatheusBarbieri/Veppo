import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import RoutesCell from './routes-cell'
import Weekdays from '../weekdays'

import './stylesheets/routes-row.scss'

const tableCellsOrder = [
  'route',
  'company',
  'mode',
  'partTime',
  'weekDays',
  'price',
  'priceWithInsurance',
  'travelDistance',
  'travelTime'
]

const RoutesRow = ({
  isSelected,
  route,
  handleClick,
  handleSpacebar
}) => {
  const selected = isSelected(route.id)
  const classes = classnames('routes-row', {
    'routes-row-selected': selected
  })

  return (
    <tr
      tabIndex='0'
      className={classes}
      onClick={(event) => handleClick(event, route.id)}
      onKeyDown={(event) => handleSpacebar(event, route.id)}>
      {tableCellsOrder.map((item) => (

        <td key={`${route.id}_${route[item]}_cell`}>
          <RoutesCell className={`routes-cell__${item}`}>
            {
              item == 'weekDays'
                ? <Weekdays weekdays={route[item]} />
                : route[item]
            }
          </RoutesCell>
        </td>

      ))}
    </tr>
  )
}

RoutesRow.propTypes = {
  isSelected: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSpacebar: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired
}

export default RoutesRow
