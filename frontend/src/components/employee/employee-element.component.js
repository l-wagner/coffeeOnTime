import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEmployee, deleteEmployee } from '../../actions/employees';
import EmployeeDataService from '../../services/employee.service';

class Employee extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDays = this.onChangeDays.bind(this);
    this.getEmployee = this.getEmployee.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeEmployee = this.removeEmployee.bind(this);

    this.state = {
      currentEmployee: {
        id: null,
        name: '',
        days: '',
        acive: true,
      },
      message: '',
    };
  }

  componentDidMount() {
    this.getEmployee(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          name: name,
        },
      };
    });
  }

  onChangeDays(e) {
    const days = e.target.value;

    this.setState((prevState) => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        days: days,
      },
    }));
  }

  getEmployee(id) {
    EmployeeDataService.get(id)
      .then((response) => {
        this.setState({
          currentEmployee: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentEmployee.id,
      name: this.state.currentEmployee.name,
      days: this.state.currentEmployee.days,
      acive: status,
    };

    this.props
      .updateEmployee(this.state.currentEmployee.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentEmployee: {
            ...prevState.currentEmployee,
            acive: status,
          },
        }));

        this.setState({ message: 'The status was updated successfully!' });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateEmployee(this.state.currentEmployee.id, this.state.currentEmployee)
      .then((reponse) => {
        console.log(reponse);

        this.setState({ message: 'The employee was updated successfully!' });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeEmployee() {
    this.props
      .deleteEmployee(this.state.currentEmployee.id)
      .then(() => {
        this.props.history.push('/employees');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentEmployee } = this.state;

    return (
      <div>
        {currentEmployee ? (
          <div className='edit-form'>
            <h4>Employee</h4>
            <form>
              <div className='form-group'>
                <label htmlFor='name'>Title</label>
                <input type='text' className='form-control' id='name' value={currentEmployee.name} onChange={this.onChangeName} />
              </div>
              <div className='form-group'>
                <label htmlFor='days'>Days</label>
                <input
                  type='text'
                  className='form-control'
                  id='days'
                  value={currentEmployee.days}
                  onChange={this.onChangeDays}
                />
              </div>

              <div className='form-group'>
                <label>
                  <strong>Status:</strong>
                </label>
                {currentEmployee.acive ? 'Active' : 'Out'}
              </div>
            </form>

            {currentEmployee.acive ? (
              <button className='badge badge-primary mr-2' onClick={() => this.updateStatus(false)}>
                UnPublish
              </button>
            ) : (
              <button className='badge badge-primary mr-2' onClick={() => this.updateStatus(true)}>
                Publish
              </button>
            )}

            <button className='badge badge-danger mr-2' onClick={this.removeEmployee}>
              Delete
            </button>

            <button type='submit' className='badge badge-success' onClick={this.updateContent}>
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Employee...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateEmployee, deleteEmployee })(Employee);
