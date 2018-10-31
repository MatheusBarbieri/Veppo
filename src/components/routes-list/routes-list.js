import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { veppoApiHost } from '../../config.js'
import RoutesHeader from './routes-header'
import RoutesRow from './routes-row'

import { stableSort, getSorting } from './util'

const styles = (theme) => ({
  root: {
    width: '83vw',
    margin: '50px 0px'
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
})

class RoutesList extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
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

  handleChangePage = (event, page) => this.setState({ page })

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value })
  }

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

  renderRow(route) {
    const isSelected = this.isSelected(route.id)
    return (
      <TableRow
        hover
        onClick={(event) => this.handleClick(event, route.id)}
        role='checkbox'
        aria-checked={isSelected}
        tabIndex={-1}
        key={route.id}
        selected={isSelected}>

        <TableCell>{route.route}</TableCell>
        <TableCell>{route.company}</TableCell>
        <TableCell>{route.mode}</TableCell>
        <TableCell>{route.partTime}</TableCell>
        <TableCell>{route.weekDays}</TableCell>
        <TableCell>{route.price}</TableCell>
        <TableCell>{route.priceWithInsurance}</TableCell>
        <TableCell>{route.travelDistance}</TableCell>
        <TableCell>{route.travelTime}</TableCell>

      </TableRow>
    )
  }

  renderEmptyRows(emptyRows) {
    return emptyRows > 0 && (
      <TableRow style={{ height: 49 * emptyRows }}>
        <TableCell colSpan={6} />
      </TableRow>
    )
  }

  render() {
    const { classes } = this.props
    const {
      routes,
      order,
      orderBy,
      rowsPerPage,
      page,
      isLoading
    } = this.state

    if (!routes || isLoading) return null

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, routes.length - page * rowsPerPage)

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby='tableTitle'>

            <RoutesHeader
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={routes.length} />

            <TableBody>
              {stableSort(routes, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((route) => (
                  <RoutesRow
                    route={route}
                    handleClick={this.handleClick}
                    isSelected={this.isSelected} />
                ))}
              {this.renderEmptyRows(emptyRows)}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          component='div'
          count={routes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Página Anterior'
          }}
          nextIconButtonProps={{
            'aria-label': 'Próxima Página'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage} />
      </Paper>
    )
  }
}

export default withStyles(styles)(RoutesList)
