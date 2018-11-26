import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'

import _compact from 'lodash/compact'

import { veppoApiHost } from '../../config.js'
import { stableSort, getSorting } from './util'

import RoutesHeader from './routes-header'
import RoutesEmptyRows from './routes-empty-rows'
import RoutesRow from './routes-row'
import TablePaginator from '../table-paginator'

import './stylesheets/routes-table.scss'

class RoutesTable extends React.Component {
  static propTypes = {
    city: PropTypes.string,
    weekDay: PropTypes.number,
    onRouteChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    city: null,
    weekDay: null
  }

  state = {
    selected: null,
    page: 0,
    rowsPerPage: 5,
    routes: null,
    filteredRoutes: null,
    isLoading: false,
    city: null, // eslint-disable-line
    weekDay: null // eslint-disable-line
  }

  handleClick = (event, route) => {
    const { onRouteChange, weekDay } = this.props
    if (weekDay) {
      this.setState({ selected: route })
      onRouteChange(route)
    }
    event.preventDefault()
    event.stopPropagation()
  }

  handleSpacebar = (event, route) => {
    const { onRouteChange, weekDay } = this.props
    if (event.charCode === 32 || event.keyCode === 32) {
      event.preventDefault()
      if (weekDay) {
        this.setState({ selected: route })
        onRouteChange(route)
      }
    }
  }

  handleChangePage = (page) => this.setState({ page })

  isSelected = (id) => {
    const { selected } = this.state
    return selected ? selected.id === id : false
  }

  identify(routes) {
    return routes.map((route, id) => {
      const newRoutes = {
        ...route,
        id
      }
      return newRoutes
    })
  }

  fetchRoutes() {
    const { city } = this.props
    const host = `${veppoApiHost}/routes?city=${city}`
    this.setState({ isLoading: true })
    fetch(host)
      .then((res) => res.json())
      .then((routes) => this.identify(routes))
      .then((routes) => {
        this.setState({ routes, isLoading: false })
        this.filterRoutes(routes)
      })
      .catch((err) => {
        this.setState({ isLoading: false })
        console.error(err)
      })
  }

  filterRoutes(routes) {
    const { weekDay } = this.props

    if (!weekDay) {
      this.setState({ filteredRoutes: routes })
    } else {
      const filteredRoutes = _compact(
        routes.filter((route) => route.weekDays.includes(weekDay))
      )
      this.setState({ filteredRoutes })
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { city, weekDay } = state

    const hasCityChanged = props.city !== city
    const hasWeekDayChanged = props.weekDay !== weekDay

    const newState = { ...state, city: props.city, weekDay: props.weekDay }

    if (hasWeekDayChanged || hasCityChanged) {
      newState.selected = null
      newState.page = 0
    }

    return newState
  }

  componentDidMount() {
    const { city } = this.props
    if (city) this.fetchRoutes().then((routes) => this.filterRoutes(routes))
  }

  componentDidUpdate(prevProps) {
    const { city, weekDay } = this.props
    const { routes } = this.state

    const hasCityChanged = prevProps.city !== city
    const hasWeekDayChanged = prevProps.weekDay !== weekDay

    if (hasCityChanged && city) this.fetchRoutes()
    if (hasWeekDayChanged && routes) this.filterRoutes(routes)
  }

  renderFooterText() {
    const {
      city,
      weekDay,
      selected
    } = this.state

    const humanizeWeekDay = () => {
      switch (weekDay) {
        case 1:
          return 'no domingo'
        case 2:
          return 'na segunda-feira'
        case 3:
          return 'na terça-feira'
        case 4:
          return 'na quarta-feira'
        case 5:
          return 'na quinta-feira'
        case 6:
          return 'na sexta-feira'
        case 7:
          return 'no sábado'
        default:
          return ''
      }
    }

    const displayWeekDay = humanizeWeekDay()
    const displayCity = city.charAt(0).toUpperCase() + city.slice(1)

    const textClasses = classnames(
      'routes-table__footer-cell__text',
      { 'routes-table__footer-cell__text--selected': weekDay && selected }
    )

    const text = () => {
      if (!weekDay) return 'Selecione um dia da semana...'
      if (weekDay && !selected) return 'Selecione uma rota...'
      if (weekDay && selected) return `Passagem para ${displayCity} às ${selected.partTime}, ${displayWeekDay}!`
    }

    return (
      <p className={textClasses}>
        {text()}
      </p>
    )
  }

  renderRows() {
    const {
      filteredRoutes,
      order,
      orderBy,
      rowsPerPage,
      page,
      weekDay
    } = this.state

    return (
      <>
        {stableSort(filteredRoutes, getSorting(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((route) => (
            <RoutesRow
              key={`${route.id}_row`}
              route={route}
              handleClick={this.handleClick}
              handleSpacebar={this.handleSpacebar}
              isSelectable={weekDay}
              isSelected={this.isSelected} />
          ))}
        <RoutesEmptyRows
          numRoutes={filteredRoutes.length}
          rowsPerPage={rowsPerPage}
          page={page} />
      </>
    )
  }

  render() {
    const {
      weekDay,
      selected,
      filteredRoutes,
      order,
      orderBy,
      rowsPerPage,
      page,
      isLoading
    } = this.state

    if (isLoading) {
      return (
        <div className='routes-table__loader'>
          <Loader
            type='Bars'
            color='#4C0002'
            height={80}
            width={80} />
        </div>
      )
    }

    if (!filteredRoutes) {
      return (
        <div className='routes-table__place-holder-text'>
          Selecione uma cidade...
        </div>
      )
    }

    const buttonClasses = classnames(
      'routes-table__footer-cell__buy-button',
      { 'routes-table__footer-cell__buy-button--visible': weekDay && selected }
    )

    return (
      <div className='routes-table'>
        <table className='routes-table__body'>
          <tbody>

            <RoutesHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={filteredRoutes.length} />

            {this.renderRows()}

            <tr className='routes-table__footer'>
              <td colSpan='999'>
                <div className='routes-table__footer-cell'>
                  <TablePaginator
                    className='routes-table__footer-cell__paginator'
                    handleChangePage={this.handleChangePage}
                    numberRoutes={filteredRoutes.length}
                    rowsPerPage={rowsPerPage}
                    currentPage={page} />

                  {this.renderFooterText()}

                  <button
                    type='button'
                    onClick={this.handleBuy}
                    className={buttonClasses}>
                    Comprar!
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    )
  }
}

export default RoutesTable
