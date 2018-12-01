import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Selector from 'react-select'

import { getNextDays, humanizeDate } from '../../lib/moment.js'
import { formatName } from '../../lib/string.js'
import './stylesheets/ticket-section.scss'

class TicketSection extends Component {
  static propTypes = {
    route: PropTypes.object,
    weekDay: PropTypes.number
  }

  static defaultProps = {
    route: null,
    weekDay: null
  }

  state = {
    selectedDate: null
  }

  handleDateChange = (selectedDate) => this.setState({ selectedDate })

  render() {
    const { route, weekDay } = this.props
    const { selectedDate } = this.state

    if (!route) return null

    const nextDays = getNextDays(weekDay, 5).map((day) => ({
      label: humanizeDate(day),
      value: day
    }))

    return (
      <div className='ticket-section__route'>
        <span className='ticket-section__route__text'>Rota:</span>
        <div className='ticket-section__route-display'>

          <div>
            <span className='ticket-section__route__labels'>Embarque: </span>
            <span className='ticket-section__route__values'>Porto Alegre</span>
          </div>

          <div>
            <span className='ticket-section__route__labels'>Destino: </span>
            <span className='ticket-section__route__values'>{`${formatName(route.city)}`}</span>
          </div>

          <div>
            <span className='ticket-section__route__labels'>Modalidade: </span>
            <span className='ticket-section__route__values'>{`${route.mode}`}</span>
          </div>

          <div>
            <span className='ticket-section__route__labels'>Linha: </span>
            <span className='ticket-section__route__values'>{`${route.route}`}</span>
          </div>

          <div>
            <span className='ticket-section__route__labels'>Empresa: </span>
            <span className='ticket-section__route__values'>{`${route.company}`}</span>
          </div>

          <div>
            <span className='ticket-section__route__labels'>Horário: </span>
            <span className='ticket-section__route__values'>{`${route.partTime}`}</span>
          </div>

          <div>
            <span className='ticket-section__route__labels'>Preço: </span>
            <span className='ticket-section__route__values'>{`R$ ${route.price}`}</span>
          </div>

          <div>
            <span className='ticket-section__route__labels'>Preço c/ seguro: </span>
            <span className='ticket-section__route__values'>{`R$ ${route.priceWithInsurance}`}</span>
          </div>

        </div>
        <div className='ticket-section__days-row'>
          <span className='ticket-section__days-row__text'>Dia:</span>
          <Selector
            className='ticket-section__day-selector'
            classNamePrefix='ticket-section__day-selector'
            value={selectedDate}
            onChange={this.handleDateChange}
            options={nextDays}
            placeholder='Selecione uma data' />
        </div>
      </div>
    )
  }
}

export default TicketSection
