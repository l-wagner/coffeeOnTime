import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEmployee } from '../actions/employees';
import { retrieveRoles } from '../actions/roles';
import { Checkbox, Input, InputGroup, Stack, InputLeftAddon, InputRightAddon } from '@chakra-ui/react';

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBlockedDays = this.onChangeBlockedDays.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.newEmployee = this.newEmployee.bind(this);

    this.state = {
      id: null,
      name: '',
      blockedDays: '',
      roles: [],
      active: true,

      submitted: false,
    };
  }
  componentDidMount() {
    this.props.retrieveRoles();
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeRoles(roleName) {
    console.log(roleName);
    var oldRoles = this.state.roles;
    // if oldRoles.includes(roleName) oldRoles.
    var newRoles = this.state.roles.concat([roleName]);
    this.setState({
      roles: newRoles,
    });
    console.log(this.state.roles);
  }

  onChangeBlockedDays(e) {
    console.log(e.target);
    this.setState({
      blockedDays: e.target.value,
    });
    console.log(this.state.blockedDays);
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
      name: '',
      blockedDays: '',
      active: false,

      submitted: false,
    });
  }

  render() {
    const { roles } = this.props;

    return (
      <div className='submit-form'>
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className='btn btn-success' onClick={this.newEmployee}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className='form-group'>
              <Stack spacing={4}>
                <InputGroup>
                  {/* <InputLeftAddon children='+234' /> */}
                  <Input type='text' placeholder='name ' value={this.state.name} onChange={this.onChangeName} />
                </InputGroup>

                {/* Roles set up for this business */}
                <InputGroup size='sm'>
                  <Stack spacing={5} direction='row'>
                    {roles &&
                      roles.map((role, index) => (
                        <Checkbox value={role.name} onChange={() => this.onChangeRoles(role.name)}>
                          {role.name}
                        </Checkbox>
                      ))}
                  </Stack>
                </InputGroup>

                {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
                <InputGroup size='sm'>
                  <Stack spacing={5} direction='row'>
                    <Checkbox value={this.state.blockedDays} onChange={this.onChangeBlockedDays} defaultChecked>
                      Mon
                    </Checkbox>
                    <Checkbox defaultChecked>Tue</Checkbox>
                    <Checkbox defaultChecked>Wed</Checkbox>
                    <Checkbox defaultChecked>Thu</Checkbox>
                    <Checkbox defaultChecked>Fri</Checkbox>
                    <Checkbox defaultChecked>Sat</Checkbox>
                    <Checkbox defaultChecked>Sun</Checkbox>
                  </Stack>
                </InputGroup>
              </Stack>
              <label htmlFor='name'>Name</label>
              {/* <input
                type='text'
                className='form-control'
                id='name'
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name='name'
              /> */}
            </div>

            {/* <div className='form-group'>
              <label htmlFor='blockedDays'>BlockedDays</label>
              <input
                type='radio'
                className='form-control'
                id='blockedDays'
                required
                value={this.state.blockedDays}
                onChange={this.onChangeBlockedDays}
                name='blockedDays'
              />
            </div> */}

            <button onClick={this.saveEmployee} className='btn btn-success'>
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    roles: state.roles,
  };
};
export default connect(mapStateToProps, { createEmployee, retrieveRoles })(AddEmployee);
