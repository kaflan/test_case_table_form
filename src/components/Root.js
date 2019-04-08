import React, { Component } from 'react';
import Table from './Table';
import AddUser from './Forms/AddUser';

class Root extends Component {
  render() {
    return (
      <div>
        <AddUser />
        <Table />
      </div>
    );
  }
}

export default Root;
