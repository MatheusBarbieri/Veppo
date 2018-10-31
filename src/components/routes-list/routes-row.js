import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const styles = () => ({
  cell: {
    padding: '4px'
  }
})

const RoutesRow = ({
  route, handleClick, isSelected, classes
}) => {
  const selected = isSelected(route.id)
  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, route.id)}
      role='checkbox'
      aria-checked={selected}
      tabIndex={-1}
      key={route.id}
      selected={selected}>

      <TableCell className={classes.cell}>{route.route}</TableCell>
      <TableCell className={classes.cell}>{route.company}</TableCell>
      <TableCell className={classes.cell}>{route.mode}</TableCell>
      <TableCell className={classes.cell}>{route.partTime}</TableCell>
      <TableCell className={classes.cell}>{route.weekDays}</TableCell>
      <TableCell className={classes.cell}>{route.price}</TableCell>
      <TableCell className={classes.cell}>{route.priceWithInsurance}</TableCell>
      <TableCell className={classes.cell}>{route.travelDistance}</TableCell>
      <TableCell className={classes.cell}>{route.travelTime}</TableCell>

    </TableRow>
  )
}

RoutesRow.propTypes = {
  classes: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired
}

export default withStyles(styles)(RoutesRow)
