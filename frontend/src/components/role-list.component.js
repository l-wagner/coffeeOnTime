import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveRoles, findRolesByName, deleteAllRoles } from '../actions/roles';
import { Link } from 'react-router-dom';

class RolesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveRole = this.setActiveRole.bind(this);
    this.findByName = this.findByName.bind(this);
    this.removeAllRoles = this.removeAllRoles.bind(this);

    this.state = {
      currentRole: null,
      currentIndex: -1,
      searchName: '',
    };
  }

  componentDidMount() {
    this.props.retrieveRoles();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  }

  refreshData() {
    this.setState({
      currentRole: null,
      currentIndex: -1,
    });
  }

  setActiveRole(role, index) {
    this.setState({
      currentRole: role,
      currentIndex: index,
    });
  }

  removeAllRoles() {
    this.props
      .deleteAllRoles()
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

    this.props.findRolesByName(this.state.searchName);
  }

  render() {
    const { searchName, currentRole, currentIndex } = this.state;
    const { roles } = this.props;

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
          <h4>Roles List</h4>

          <ul className='list-group'>
            {roles &&
              roles.map((role, index) => (
                <li
                  className={'list-group-item ' + (index === currentIndex ? 'active' : '')}
                  onClick={() => this.setActiveRole(role, index)}
                  key={index}>
                  {role.name}
                </li>
              ))}
          </ul>

          <button className='m-3 btn btn-sm btn-danger' onClick={this.removeAllRoles}>
            Remove All
          </button>
        </div>
        <div className='col-md-6'>
          {currentRole ? (
            <div>
              <h4>Role</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{' '}
                {currentRole.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{' '}
                {currentRole.description}
              </div>
              <div>
                <label>
                  <strong>Icon:</strong>
                </label>{' '}
                {currentRole.icon}
              </div>

              <Link to={'/roles/' + currentRole.id} className='badge badge-warning'>
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Role...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    roles: state.roles,
  };
};

export default connect(mapStateToProps, {
  retrieveRoles,
  findRolesByName,
  deleteAllRoles,
})(RolesList);
