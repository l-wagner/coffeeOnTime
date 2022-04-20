import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateShift, deleteShift } from '../actions/shifts';
import ShiftDataService from '../services/shift.service';

class Shift extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDays = this.onChangeDays.bind(this);
    this.getShift = this.getShift.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeShift = this.removeShift.bind(this);

    this.state = {
      currentShift: {
        id: null,
        name: '',
        days: '',
        acive: true,
      },
      message: '',
    };
  }

  componentDidMount() {
    this.getShift(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentShift: {
          ...prevState.currentShift,
          name: name,
        },
      };
    });
  }

  onChangeDays(e) {
    const days = e.target.value;

    this.setState((prevState) => ({
      currentShift: {
        ...prevState.currentShift,
        days: days,
      },
    }));
  }

  getShift(id) {
    ShiftDataService.get(id)
      .then((response) => {
        this.setState({
          currentShift: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentShift.id,
      name: this.state.currentShift.name,
      days: this.state.currentShift.days,
      acive: status,
    };

    this.props
      .updateShift(this.state.currentShift.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentShift: {
            ...prevState.currentShift,
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
      .updateShift(this.state.currentShift.id, this.state.currentShift)
      .then((reponse) => {
        console.log(reponse);

        this.setState({ message: 'The shift was updated successfully!' });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeShift() {
    this.props
      .deleteShift(this.state.currentShift.id)
      .then(() => {
        this.props.history.push('/shifts');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentShift } = this.state;

    return (
      <div>
        {currentShift ? (
          <div className='edit-form'>
            <h4>Shift</h4>
            <form>
              <div className='form-group'>
                <label htmlFor='name'>Title</label>
                <input type='text' className='form-control' id='name' value={currentShift.name} onChange={this.onChangeName} />
              </div>
              <div className='form-group'>
                <label htmlFor='days'>Days</label>
                <input
                  type='text'
                  className='form-control'
                  id='days'
                  value={currentShift.days}
                  onChange={this.onChangeDays}
                />
              </div>

              <div className='form-group'>
                <label>
                  <strong>Status:</strong>
                </label>
                {currentShift.acive ? 'Published' : 'Pending'}
              </div>
            </form>

            {currentShift.acive ? (
              <button className='badge badge-primary mr-2' onClick={() => this.updateStatus(false)}>
                UnPublish
              </button>
            ) : (
              <button className='badge badge-primary mr-2' onClick={() => this.updateStatus(true)}>
                Publish
              </button>
            )}

            <button className='badge badge-danger mr-2' onClick={this.removeShift}>
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
            <p>Please click on a Shift...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateShift, deleteShift })(Shift);
