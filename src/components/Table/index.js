import React from 'react';
import PropTypes from 'prop-types';

import {
    withStyles, Table,
    TableBody, TableCell,
    TablePagination, TableRow,
    Paper,
    Checkbox,
    Typography
} from '@material-ui/core';

import { stableSort, getSorting, rows } from '../../utils/tableHelper';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {

    render() {
        const { 
            classes, isSelected,
            handleClick, handleSelectAllClick,
            handleRequestSort, handleChangePage, handleChangeRowsPerPage, data,  order, orderBy, selected, rowsPerPage, page,
            removeUser
         } = this.props;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        if (data.length === 0) {
            return (
                <Paper className={classes.root}>
                    <Typography component="h2" variant="h1" gutterBottom align='center'>
                        No Data
                    </Typography>
                </Paper>);
        }

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} removeUser={removeUser} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                            rows={rows}
                        />
                        <TableBody>
                            {
                                stableSort(data, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(n => {
                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => handleClick(event, n.id)}
                                                role="checkbox"
                                                aria-checked={isSelected(n.id)}
                                                tabIndex={-1}
                                                key={n.id}
                                                selected={isSelected(n.id)}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isSelected(n.id)} />
                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none">
                                                    {n.firstName}
                                                </TableCell>
                                                <TableCell align="right">{n.lastName}</TableCell>
                                                <TableCell align="right">{n.phone}</TableCell>
                                                <TableCell align="right">{n.age}</TableCell>
                                            </TableRow>
                                        );
                                    })
                            }
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        );
    }


}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape())
};

export default withStyles(styles)(EnhancedTable);
