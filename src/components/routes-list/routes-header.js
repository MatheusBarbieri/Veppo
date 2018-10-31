import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'

const rows = [
  {
    id: 'route', numeric: false, disablePadding: false, label: 'Linha'
  },
  {
    id: 'company', numeric: false, disablePadding: false, label: 'Empresa'
  },
  {
    id: 'mode', numeric: false, disablePadding: false, label: 'Modo'
  },
  {
    id: 'partTime', numeric: false, disablePadding: false, label: 'Hora de partida'
  },
  {
    id: 'weekDays', numeric: false, disablePadding: false, label: 'Frequência'
  },
  {
    id: 'price', numeric: false, disablePadding: false, label: 'Preço s/ seguro'
  },
  {
    id: 'priceWithInsurance', numeric: false, disablePadding: false, label: 'Preço c/ seguro'
  },
  {
    id: 'travelDistance', numeric: false, disablePadding: false, label: 'Distância'
  },
  {
    id: 'travelTime', numeric: false, disablePadding: false, label: 'Tempo de viagem'
  }
]

const styles = () => ({
  cell: {
    padding: '4px'
  }
})

class RoutesHeader extends React.Component {
  createSortHandler = (property) => (event) => {
    const { onRequestSort } = this.props
    return onRequestSort(event, property)
  }

  render() {
    const {
      order,
      orderBy,
      classes
    } = this.props

    return (
      <TableHead>
        <TableRow>
          {rows.map((row) => (
            <TableCell
              className={classes.cell}
              key={row.id}
              numeric={row.numeric}
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === row.id ? order : false}>
              <Tooltip
                title='Sort'
                placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}>
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={this.createSortHandler(row.id)}>
                  {row.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }
}

RoutesHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
}

export default withStyles(styles)(RoutesHeader)
