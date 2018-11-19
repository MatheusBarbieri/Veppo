import React from 'react'
import PropTypes from 'prop-types'

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
    weekDay: PropTypes.number
  }

  static defaultProps = {
    city: null,
    weekDay: null
  }

  state = {
    order: 'asc',
    orderBy: 'partTime',
    selected: null,
    page: 0,
    rowsPerPage: 5,
    routes: null,
    isLoading: false
  }

  handleRequestSort = (event, property) => {
    const newOrderBy = property
    let newOrder = 'desc'

    const { order, orderBy } = this.state
    if (orderBy === property && order === 'desc') {
      newOrder = 'asc'
    }

    this.setState({ order: newOrder, orderBy: newOrderBy })
  };

  handleClick = (event, id) => this.setState({ selected: id })

  handleSpacebar = (event, id) => {
    if (event.charCode === 32 || event.keyCode === 32) {
      event.preventDefault()
      this.setState({ selected: id })
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
      .then((routes) => this.setState({ routes }))
      .catch((err) => console.error(err))
  }

  componentDidMount() {
    const { city } = this.props
    if (city) this.fetchRoutes()
  }

  componentDidUpdate(prevProps) {
    const { city } = this.props
    const hasCityChanged = prevProps.city !== city
    if (hasCityChanged) this.fetchRoutes()
  }

  renderRows() {
    const {
      routes,
      order,
      orderBy,
      rowsPerPage,
      page
    } = this.state

    return (
      <>
        {stableSort(routes, getSorting(order, orderBy))
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
          numRoutes={routes.length}
          rowsPerPage={rowsPerPage}
          page={page} />
      </>
    )
  }

  render() {
    const {
      routes,
      order,
      orderBy,
      rowsPerPage,
      page,
      isLoading
    } = this.state

    if (!routes || isLoading) return null

    return (
      <div className='routes-table'>
        <table className='routes-table__body'>
          <tbody>

            <RoutesHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={routes.length} />

            {this.renderRows()}

            <tr className='routes-table__footer'>
              <td colSpan='999'>
                <div className='routes-table__footer-cell'>
                  <TablePaginator
                    handleChangePage={this.handleChangePage}
                    numberRoutes={routes.length}
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
