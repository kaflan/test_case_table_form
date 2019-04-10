import React, { Component } from 'react';

import Table from './Table';
import AddUser from './Forms/AddUser';
import { createData } from './../utils/tableHelper';

class Root extends Component {

  state = {
    order: 'asc',
    orderBy: 'firstName',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    data: [],
  };

  render() {
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    return (
      <div>
        <AddUser createUser={this.createUser} />
        <Table 
          data={data}
          handleRequestSort={this.handleRequestSort}
          handleSelectAllClick={this.handleSelectAllClick}
          handleClick={this.handleClick}
          handleChangePage={this.handleChangePage}
          handleChangeRowsPerPage={this.handleChangeRowsPerPage}
          isSelected={this.isSelected}
          order={order}
          orderBy={orderBy}
          selected={selected}
          rowsPerPage={rowsPerPage}
          page={page}
          removeUser={this.removeUser}
        />
      </div>
    );
  }

  createUser = ({ firstName, lastName, phone, age }) => {
    const { data } = this.state;
    const user = createData(firstName, lastName, phone, age);
    this.setState({
      data: [...data.concat(user)]
    })
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
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
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  removeUser = () => {
    const { selected, data } = this.state;
    const result = data.map(dataItem => {
      if(selected.indexOf(dataItem.id) >= 0) {
        return null;
      }
      return dataItem;
    }).filter(item => item);
    this.setState({
      data: result,
      selected: []
    })
  }

}

export default Root;
