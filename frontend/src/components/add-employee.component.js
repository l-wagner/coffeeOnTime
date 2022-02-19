import React, { Component } from "react";
import { connect } from "react-redux";
import { createEmployee } from "../actions/employees";

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBlockedDays = this.onChangeBlockedDays.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.newEmployee = this.newEmployee.bind(this);

    this.state = {
      id: null,
      name: "",
      blockedDays: "",
      active: true,

      submitted: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeBlockedDays(e) {
    this.setState({
      blockedDays: e.target.value,
    });
  }

  saveEmployee() {
    const { name, blockedDays } = this.state;

    this.props
      .createEmployee(name, blockedDays)
      .then((data) => {
        this.setState({
          id: data.id,
          name: data.name,
          blockedDays: data.blockedDays,
          active: data.active,

          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newEmployee() {
    this.setState({
      id: null,
      name: "",
      blockedDays: "",
      active: false,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newEmployee}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="blockedDays">BlockedDays</label>
              <input
                type="text"
                className="form-control"
                id="blockedDays"
                required
                value={this.state.blockedDays}
                onChange={this.onChangeBlockedDays}
                name="blockedDays"
              />
            </div>

            <button onClick={this.saveEmployee} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createEmployee })(AddEmployee);
