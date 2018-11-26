import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import uid from 'uniqid'

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
  isSelected, route, handleClick, handleSpacebar, className, isSelectable
}) => {
  const selected = isSelected(route.id)

  const classes = classnames(
    className,
    'routes-row',
    {
      'routes-row--selectable': isSelectable,
      'routes-row--selected': selected
    }
  )

  const humanize = (timeMin) => {
    const minutes = timeMin % 60
    const hours = (timeMin - minutes) / 60

    const hoursLabel = () => {
      if (hours === 0) return ''
      return hours + (hours === 1 ? ' hora' : ' horas')
    }

    const minsLabel = () => {
      if (minutes === 0) return ''
      return minutes + (minutes === 1 ? ' minuto' : ' minutos')
    }

    const andLabel = () => (
      minutes && hours ? (<>{' e '} <br /></>) : ''
    )

    return (
      <>
        {hoursLabel()}
        {andLabel()}
        {minsLabel()}
      </>
    )
  }

  const renderItem = (item) => {
    switch (item) {
      case 'weekDays':
        return <Weekdays weekdays={route[item]} />
      case 'price':
        return `R$ ${route[item]}`
      case 'priceWithInsurance':
        return `R$ ${route[item]}`
      case 'travelDistance':
        return `${route[item]}Km`
      case 'travelTime':
        return humanize(route[item])
      default:
        return route[item]
    }
  }

  const renderCells = () => tableCellsOrder.map((item) => (
    <td key={uid('cell')}>
      <RoutesCell className={`routes-cell__${item}`}>
        {renderItem(item, route)}
      </RoutesCell>
    </td>
  ))

  return (
    <tr
      tabIndex='0'
      className={classes}
      onClick={(event) => handleClick(event, route)}
      onKeyDown={(event) => handleSpacebar(event, route)}>
      {renderCells()}
    </tr>
  )
}

RoutesRow.propTypes = {
  className: PropTypes.string,
  isSelectable: PropTypes.bool,
  isSelected: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSpacebar: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired
}

RoutesRow.defaultProps = {
  isSelectable: false,
  className: ''
}

export default RoutesRow
