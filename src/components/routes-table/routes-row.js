import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import uid from 'uniqid'

import { humanizeTable, getWeekDaysAsString } from '../../lib/moment.js'
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
        return humanizeTable(route[item])
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

  const acessibleLabel = `Rota ${route.mode} ${route.route} pela empresa ${route.company}
  com partida às ${route.partTime}.
  Frequência: ${getWeekDaysAsString(route.weekDays)}.
  Preço em reais sem seguro: ${route.price}, preço em reais com seguro: ${route.priceWithInsurance}.
  Distancia de: ${route.travelDistance}
  com tempo de viagem estimado: ${route.travelTime}.
  Aperte enter para selecionar.
  `

  return (
    <tr
      aria-label={acessibleLabel}
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
