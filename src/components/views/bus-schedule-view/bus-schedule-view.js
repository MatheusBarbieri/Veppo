import classnames from 'classnames'
import Modal from 'react-responsive-modal'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Selector from 'react-select'

import LoginForm from '../../login-form'
import RoutesTable from '../../routes-table'
import Section from '../../section'
import SectionTitle from '../../section-title'
import TicketSection from '../../ticket-section'
import withCities from '../../../lib/with-cities.js'
import withUser from '../../../lib/with-user.js'
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
  },
  {
    value: 'alldays',
    day: 0,
    label: 'Todos os dias'
  }
]

class BusScheduleView extends Component {
  static propTypes = {
    cities: PropTypes.array,
    user: PropTypes.shape({
      userLogin: PropTypes.string,
      authenticated: PropTypes.bool
    }).isRequired,
    setUserLogin: PropTypes.func.isRequired
  }

  static defaultProps = {
    cities: {}
  }

  state = {
    selectedCity: null,
    selectedWeekDay: null,
    selectedRoute: null,
    shouldRenderBuySection: false,
    loginOpen: false
  }

  onOpenLoginModal = () => {
    this.setState({ loginOpen: true })
  }

  onCloseLoginModal = () => {
    this.setState({ loginOpen: false })
  }

  handleCityChange = (selectedCity) => this.setState({ selectedCity })

  handleWeekDayChange = (selectedWeekDay) => this.setState({ selectedWeekDay })

  handleRouteChange = (selectedRoute) => {
    this.setState({ selectedRoute })
    this.setState({ shouldRenderBuySection: false })
  }

  handleBuyClick = () => {
    const { user: { authenticated } } = this.props
    if (!authenticated) {
      this.onOpenLoginModal()
    } else {
      this.setState({ shouldRenderBuySection: true })
    }
  }

  handleLogin = (name) => {
    const { setUserLogin } = this.props
    setUserLogin(name)
    this.setState({ shouldRenderBuySection: true })
    this.setState({ loginOpen: false })
  }

  render() {
    const { cities } = this.props
    if (!cities) return null
    const {
      selectedCity,
      selectedWeekDay,
      loginOpen,
      selectedRoute,
      shouldRenderBuySection
    } = this.state

    const modalClassNames = {
      modal: 'bus-schedule-view__modal',
      closeIcon: 'bus-schedule-view__modal__close-icon'
    }

    const ticketSectionClasses = classnames(
      'ticket-display',
      { 'ticket-display--visible': shouldRenderBuySection }
    )

    return (
      <div className='bus-schedule-view'>
        <Section>
          <SectionTitle label='Horários de Ônibus' />
          <div className='options-row'>
            <div className='options-row__option'>
              <span className='options-row__label'>Cidade destino: </span>
              <Selector
                aria-labelledby='Cidade destino'
                className='city-selector'
                classNamePrefix='city-selector'
                value={selectedCity}
                onChange={this.handleCityChange}
                options={cities}
                placeholder='Cidade Destino' />
            </div>
            <div className='options-row__option'>
              <span className='options-row__label'>Dia da semana: </span>
              <Selector
                aria-labelledby='Dia da semana'
                className='week-day-selector'
                classNamePrefix='week-day-selector'
                value={selectedWeekDay}
                onChange={this.handleWeekDayChange}
                options={weekDays}
                placeholder='Dia da semana' />
            </div>
          </div>
          <RoutesTable
            city={selectedCity && selectedCity.value}
            weekDay={selectedWeekDay && selectedWeekDay.day}
            onRouteChange={this.handleRouteChange}
            onBuyClick={this.handleBuyClick} />

          <div className={ticketSectionClasses}>
            <SectionTitle label='Comprar Passagens' />
            <TicketSection route={selectedRoute} weekDay={selectedWeekDay && selectedWeekDay.day} />
          </div>
        </Section>

        <Modal
          classNames={modalClassNames}
          open={loginOpen}
          onClose={this.onCloseLoginModal}
          center>
          <LoginForm onLogin={this.handleLogin} />
        </Modal>

      </div>
    )
  }
}

export default withUser(withCities(BusScheduleView))
