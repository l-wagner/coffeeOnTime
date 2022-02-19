import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveEmployees, findEmployeesByName, deleteAllEmployees } from '../actions/employees';
import { Link } from 'react-router-dom';

class EmployeesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveEmployee = this.setActiveEmployee.bind(this);
    this.findByName = this.findByName.bind(this);
    this.removeAllEmployees = this.removeAllEmployees.bind(this);

    this.state = {
      currentEmployee: null,
      currentIndex: -1,
      searchName: '',
    };
  }

  componentDidMount() {
    this.props.retrieveEmployees();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  }

  refreshData() {
    this.setState({
      currentEmployee: null,
      currentIndex: -1,
    });
  }

  setActiveEmployee(employee, index) {
    this.setState({
      currentEmployee: employee,
      currentIndex: index,
    });
  }

  removeAllEmployees() {
    this.props
      .deleteAllEmployees()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByName() {
    this.refreshData();

    this.props.findEmployeesByName(this.state.searchName);
  }

  render() {
    const { searchName, currentEmployee, currentIndex } = this.state;
    const { employees } = this.props;

    return (
      <div className='list row'>
        <div className='col-md-8'>
          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Search by name'
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className='input-group-append'>
              <button className='btn btn-outline-secondary' type='button' onClick={this.findByName}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <h4>Employees List</h4>

          <ul className='list-group'>
            {employees &&
              employees.map((employee, index) => (
                <li
                  className={'list-group-item ' + (index === currentIndex ? 'active' : '')}
                  onClick={() => this.setActiveEmployee(employee, index)}
                  key={index}>
                  {employee.name}
                </li>
              ))}
          </ul>

          <button className='m-3 btn btn-sm btn-danger' onClick={this.removeAllEmployees}>
            Remove All
          </button>
        </div>
        <div className='col-md-6'>
          {currentEmployee ? (
            <div>
              <h4>Employee</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{' '}
                {currentEmployee.name}
              </div>
              <div>
                <label>
                  <strong>BlockedDays:</strong>
                </label>{' '}
                {currentEmployee.blockedDays}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{' '}
                {currentEmployee.published ? 'Published' : 'Pending'}
              </div>

              <Link to={'/employees/' + currentEmployee.id} className='badge badge-warning'>
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Employee...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employees: state.employees,
  };
};

export default connect(mapStateToProps, {
  retrieveEmployees,
  findEmployeesByName,
  deleteAllEmployees,
})(EmployeesList);
