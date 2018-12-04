import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'

import _compact from 'lodash/compact'

import { veppoApiHost } from '../../config.js'
import { stableSort, getSorting } from './util'

import { humanizeWeekDay } from '../../lib/moment.js'
import RoutesHeader from './routes-header'
import RoutesEmptyRows from './routes-empty-rows'
import RoutesRow from './routes-row'
import TablePaginator from '../table-paginator'

import './stylesheets/routes-table.scss'

class RoutesTable extends React.Component {
  static propTypes = {
    city: PropTypes.string,
    weekDay: PropTypes.number,
    onRouteChange: PropTypes.func.isRequired,
    onBuyClick: PropTypes.func.isRequired
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
    city: null,
    weekDay: null
  }

  handleClick = (event, route) => {
    const { onRouteChange, weekDay } = this.props
    if (weekDay) {
      this.setState({ selected: route })
      onRouteChange(route)
    }
  }

  handleSpacebar = (event, route) => {
    const { onRouteChange, weekDay } = this.props
    if (event.charCode === 32 || event.keyCode === 32 || event.charCode === 13 || event.keyCode === 13) {
      event.preventDefault()
      if (weekDay) {
        this.setState({ selected: route })
        onRouteChange(route)
      }
    }
  }

  handleBuyButtonClick = () => {
    const { onBuyClick } = this.props
    onBuyClick()
  }

  handleSpacebarBuyButton = (event) => {
    const { onBuyClick } = this.props
    if (event.charCode === 32 || event.keyCode === 32 || event.charCode === 13 || event.keyCode === 13) {
      event.preventDefault()
      onBuyClick()
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
      props.onRouteChange(null)
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

    const displayWeekDay = humanizeWeekDay(weekDay)
    const displayCity = city ? city.charAt(0).toUpperCase() + city.slice(1) : ''

    const textClasses = classnames(
      'routes-table__footer-cell__text',
      { 'routes-table__footer-cell__text--selected': weekDay && selected }
    )

    const text = () => {
      if (city && !weekDay) return 'Para comprar passagens, selecione um dia da semana...'
      if (city && weekDay && !selected) return 'Para comprar passagens, selecione uma rota...'
      if (city && weekDay && selected) return `Passagem para ${displayCity} às ${selected.partTime}, ${displayWeekDay}!`
      return ''
    }

    return (
      <p className={textClasses}>
        {text()}
      </p>
    )
  }

  renderRows() {
    const {
      city,
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
              isSelectable={city && weekDay}
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
      city,
      weekDay,
      selected,
      filteredRoutes,
      isLoading,
      order,
      orderBy,
      rowsPerPage,
      page
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

    if (!city || !filteredRoutes) {
      return (
        <div className='routes-table__place-holder-text'>
          Selecione uma cidade...
        </div>
      )
    }

    const buttonClasses = classnames(
      'routes-table__footer-cell__buy-button',
      { 'routes-table__footer-cell__buy-button--visible': city && weekDay && selected }
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
                    onClick={(event) => this.handleBuyButtonClick(event)}
                    onKeyDown={(event) => this.handleSpacebarBuyButton(event)}
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
