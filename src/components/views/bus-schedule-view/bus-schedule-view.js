import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Selector from 'react-select'

import Section from '../../section'
import SectionTitle from '../../section-title'
import RoutesTable from '../../routes-table'
import withCities from '../../../lib/withCities.js'
import './stylesheets/bus-schedule-view.scss'

const weekDays = [
  {
    value: 'sunday',
    day: 1,
    label: 'Domingo'
  },
  {
    value: 'monday',
    day: 2,
    label: 'Segunda-feira'
  },
  {
    value: 'tuesday',
    day: 3,
    label: 'Terça-feira'
  },
  {
    value: 'wednesday',
    day: 4,
    label: 'Quarta-feira'
  },
  {
    value: 'thursday',
    day: 5,
    label: 'Quinta-feira'
  },
  {
    value: 'friday',
    day: 6,
    label: 'Sexta-feira'
  },
  {
    value: 'saturday',
    day: 7,
    label: 'Sábado'
  }
]

class BusScheduleView extends Component {
  static propTypes = {
    cities: PropTypes.array
  }

  static defaultProps = {
    cities: {}
  }

  state = {
    selectedCity: null,
    selectedWeekDay: null,
    selectedRoute: null
  }

  handleCityChange = (selectedCity) => this.setState({ selectedCity })

  handleWeekDayChange = (selectedWeekDay) => this.setState({ selectedWeekDay })

  handleRouteChange = (selectedRoute) => this.setState({ selectedRoute })

  render() {
    const { cities } = this.props
    if (!cities) return null
    const { selectedCity, selectedWeekDay } = this.state

    return (
      <div className='bus-schedule-view'>
        <Section>
          <SectionTitle label='Horários de Ônibus' />
          <div className='options-row'>
            <Selector
              className='city-selector'
              classNamePrefix='city-selector'
              value={selectedCity}
              onChange={this.handleCityChange}
              options={cities}
              placeholder='Cidade Destino' />
            <Selector
              className='week-day-selector'
              classNamePrefix='week-day-selector'
              value={selectedWeekDay}
              onChange={this.handleWeekDayChange}
              options={weekDays}
              placeholder='Dia (opicional)' />
          </div>
          <div className='routes-list'>
            <RoutesTable
              city={selectedCity && selectedCity.value}
              weekDay={selectedWeekDay && selectedWeekDay.day}
              onRouteChange={this.handleRouteChange} />
          </div>
        </Section>
      </div>
    )
  }
}

export default withCities(BusScheduleView)
