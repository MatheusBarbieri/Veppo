import React from 'react'
import PropTypes from 'prop-types'

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
    const { onRouteChange } = this.props
    this.setState({ selected: route.id })
    onRouteChange(route)
  }

  handleSpacebar = (event, route) => {
    const { onRouteChange } = this.props
    if (event.charCode === 32 || event.keyCode === 32) {
      event.preventDefault()
      this.setState({ selected: route.id })
      onRouteChange(route)
    }
  }

  handleChangePage = (page) => this.setState({ page })

  isSelected = (id) => {
    const { selected } = this.state
    return selected === id
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
    fetch(host)
      .then((res) => res.json())
      .then((routes) => this.identify(routes))
      .then((routes) => {
        this.setState({ routes })
        this.filterRoutes(routes)
      })
      .catch((err) => console.error(err))
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

    if (hasCityChanged) this.fetchRoutes()
    if (hasWeekDayChanged && routes) this.filterRoutes(routes)
  }

  renderRows() {
    const {
      filteredRoutes,
      order,
      orderBy,
      rowsPerPage,
      page
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
      filteredRoutes,
      order,
      orderBy,
      rowsPerPage,
      page,
      isLoading
    } = this.state

    if (!filteredRoutes || isLoading) return null

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
                    handleChangePage={this.handleChangePage}
                    numberRoutes={filteredRoutes.length}
                    rowsPerPage={rowsPerPage}
                    currentPage={page} />
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
