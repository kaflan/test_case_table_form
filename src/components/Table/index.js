import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

let id = 0;
function createData(firstName, lastName, phoneNumber, age) {
    id += 1;
    return { id, firstName, lastName, phoneNumber, age };
}

const rows = [
    createData('Frozen yoghurt', 'Frozen yoghurt', "12122", 24),
    createData('Ice cream sandwich', 'Frozen yoghurt', "12122", 37),
    createData('Eclair', 'Frozen yoghurt', "12122", 6),
    createData('Cupcake', 'Frozen yoghurt', "12122", 5),
    createData('Gingerbread', 'Frozen yoghurt', "12122", 49),
];

const labels = [
    { label: 'First Name', id: 'firstName'  },
    { label: 'Last Name', id: 'lastName' },
    { label: 'Phone', id: 'phone' },
    { label: 'Age', id: 'age' }
];
function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === "desc"
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy);
}
class SimpleTable extends  React.Component {
    state = {
        order: "asc",
        orderBy: "firstName",
        data: rows,
    };
    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        this.setState({ selected: newSelected });
    };
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = "desc";

        if (this.state.orderBy === property && this.state.order === "desc") {
            order = "asc";
        }

        this.setState({ order, orderBy });
    };
    createSortHandler = property => event => {
        this.handleRequestSort(event, property);
    };
    render() {
        const { classes } = this.props;
        const { orderBy, order, data } = this.state;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {
                                labels.map((row) => <TableCell
                                key={row.id}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stableSort(data, getSorting(order, orderBy)).map( n => <TableRow
                                hover
                                onClick={event => this.handleClick(event, n.id)}
                                role="checkbox"
                                tabIndex={-1}
                                key={n.id}
                            >
                                <TableCell >{n.firstName}</TableCell>
                                <TableCell >{n.lastName}</TableCell>
                                <TableCell >{n.phoneNumber}</TableCell>
                                <TableCell >{n.age}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
