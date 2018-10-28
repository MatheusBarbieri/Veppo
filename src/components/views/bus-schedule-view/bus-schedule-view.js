import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Selector from 'react-select'

import Section from '../../section'
import SectionTitle from '../../section-title'
import withCities from '../../../lib/withCities.js'
import './stylesheets/bus-schedule-view.scss'

const weekDays = [
  {
    value: 'sunday',
    label: 'Domingo'
  },
  {
    value: 'monday',
    label: 'Segunda-feira'
  },
  {
    value: 'tuesday',
    label: 'Terça-feira'
  },
  {
    value: 'wednesday',
    label: 'Quarta-feira'
  },
  {
    value: 'thursday',
    label: 'Quinta-feira'
  },
  {
    value: 'friday',
    label: 'Sexta-feira'
  },
  {
    value: 'saturday',
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
    selectedWeekDay: null
  }

  handleCityChange = (selectedCity) => this.setState({ selectedCity })

  handleWeekDayChange = (selectedWeekDay) => this.setState({ selectedWeekDay })

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
              value={selectedCity}
              onChange={this.handleCityChange}
              options={cities} />
            <Selector
              className='week-day-selector'
              value={selectedWeekDay}
              onChange={this.handleWeekDayChange}
              options={weekDays} />
          </div>
        </Section>
      </div>
    )
  }
}

export default withCities(BusScheduleView)
