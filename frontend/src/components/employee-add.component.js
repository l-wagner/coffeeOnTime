import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEmployee } from '../actions/employees.js';
import { retrieveTags } from '../actions/tags.js';
import { Checkbox, Input, InputGroup, Stack, HStack } from '@chakra-ui/react';

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBlockedDays = this.onChangeBlockedDays.bind(this);
    this.onChangeEmployeeTags = this.onChangeEmployeeTags.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.newEmployee = this.newEmployee.bind(this);

    this.state = {
      id: null,
      name: '',
      blockedDays: [],
      employeeTags: [],
      active: true,

      submitted: false,
    };
  }
  componentDidMount() {
    this.props.retrieveTags();
  
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeEmployeeTags(tagName) {
    let { employeeTags } = this.state;
    let index = employeeTags.indexOf(tagName);
    index >= 0 ? employeeTags.splice(index, 1) : employeeTags.push(tagName);
    this.setState({
      employeeTags: employeeTags,
    });
    console.log(this.state.employeeTags);
  }

  onChangeBlockedDays(day) {
    let { blockedDays } = this.state;
    let index = blockedDays.indexOf(day);
    index >= 0 ? blockedDays.splice(index, 1) : blockedDays.push(day);
    this.setState({
      blockedDays: blockedDays,
    });
    console.log(this.state.blockedDays);
  }

  saveEmployee() {
    const { name, blockedDays, employeeTags } = this.state;

    this.props
      .createEmployee(name, blockedDays.join(','), employeeTags.join(','))
      .then((data) => {
        this.setState({
          id: data.id,
          name: data.name,
          blockedDays: data.blockedDays,
          employeeTags: data.employeeTags,
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
    const { availableTags } = this.props;

    return (
      <div className='submit-form'>
        {this.state.submitted && (
          <div>
            <h4>You submitted successfully!</h4>
            <button className='btn btn-success' onClick={this.newEmployee}>
              Add
            </button>
          </div>
        )}
        <div>
          <div className='form-group'>
            <Stack spacing={4}>
              <InputGroup>
                {/* <InputLeftAddon children='+234' /> */}
                <Input type='text' placeholder='name ' value={this.state.name} onChange={this.onChangeName} />
              </InputGroup>

              {/* Tags set up for this business */}
              <InputGroup size='sm'>
                <Stack spacing={5} direction='row'>
                  {availableTags &&
                    availableTags.map((tag, index) => (
                      <Checkbox value={tag.id} key={tag.id} onChange={() => this.onChangeEmployeeTags(tag.id)}>
                        {tag.name}
                      </Checkbox>
                    ))}
                </Stack>
              </InputGroup>

              {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
              <InputGroup size='sm'>
                <HStack align='stretch' direction='row'>
                  <Checkbox value='Mon' onChange={() => this.onChangeBlockedDays('Mon')}>
                    Mon
                  </Checkbox>
                  <Checkbox value='Tue' onChange={() => this.onChangeBlockedDays('Tue')}>
                    Tue
                  </Checkbox>
                  <Checkbox value='Wed' onChange={() => this.onChangeBlockedDays('Wed')}>
                    Wed
                  </Checkbox>
                  <Checkbox value='Thu' onChange={() => this.onChangeBlockedDays('Thu')}>
                    Thu
                  </Checkbox>
                  <Checkbox value='Fri' onChange={() => this.onChangeBlockedDays('Fri')}>
                    Fri
                  </Checkbox>
                  <Checkbox value='Sat' onChange={() => this.onChangeBlockedDays('Sat')}>
                    Sat
                  </Checkbox>
                  <Checkbox value='Sun' onChange={() => this.onChangeBlockedDays('Sun')}>
                    Sun
                  </Checkbox>
                </HStack>
              </InputGroup>
            </Stack>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    availableTags: state.roles,
  };
};
export default connect(mapStateToProps, { createEmployee, retrieveTags })(AddEmployee);
