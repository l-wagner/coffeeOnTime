import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveShifts, findShiftsByName, deleteAllShifts } from '../actions/shifts';
import { Link } from 'react-router-dom';

class ShiftsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveShift = this.setActiveShift.bind(this);
    this.findByName = this.findByName.bind(this);
    this.removeAllShifts = this.removeAllShifts.bind(this);

    this.state = {
      currentShift: null,
      currentIndex: -1,
      searchName: '',
    };
  }

  componentDidMount() {
    this.props.retrieveShifts();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  }

  refreshData() {
    this.setState({
      currentShift: null,
      currentIndex: -1,
    });
  }

  setActiveShift(shift, index) {
    this.setState({
      currentShift: shift,
      currentIndex: index,
    });
  }

  removeAllShifts() {
    this.props
      .deleteAllShifts()
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

    this.props.findShiftsByName(this.state.searchName);
  }

  render() {
    const { searchName, currentShift, currentIndex } = this.state;
    const { shifts } = this.props;

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
          <h4>Shifts List</h4>

          <ul className='list-group'>
            {shifts &&
              shifts.map((shift, index) => (
                <li
                  className={'list-group-item ' + (index === currentIndex ? 'active' : '')}
                  onClick={() => this.setActiveShift(shift, index)}
                  key={index}>
                  {shift.name}
                </li>
              ))}
          </ul>

          <button className='m-3 btn btn-sm btn-danger' onClick={this.removeAllShifts}>
            Remove All
          </button>
        </div>
        <div className='col-md-6'>
          {currentShift ? (
            <div>
              <h4>Shift</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{' '}
                {currentShift.name}
              </div>
              <div>
                <label>
                  <strong>BlockedDays:</strong>
                </label>{' '}
                {currentShift.blockedDays}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{' '}
                {currentShift.published ? 'Published' : 'Pending'}
              </div>

              <Link to={'/shifts/' + currentShift.id} className='badge badge-warning'>
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Shift...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shifts: state.shifts,
  };
};

export default connect(mapStateToProps, {
  retrieveShifts,
  findShiftsByName,
  deleteAllShifts,
})(ShiftsList);
