import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateRole, deleteRole } from '../actions/roles';
import RoleDataService from '../services/employee.service';

class Role extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getRole = this.getRole.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeRole = this.removeRole.bind(this);

    this.state = {
      currentRole: {
        id: null,
        name: '',
        description: '',
        acive: true,
      },
      message: '',
    };
  }

  componentDidMount() {
    this.getRole(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentRole: {
          ...prevState.currentRole,
          name: name,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentRole: {
        ...prevState.currentRole,
        description: description,
      },
    }));
  }

  getRole(id) {
    RoleDataService.get(id)
      .then((response) => {
        this.setState({
          currentRole: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentRole.id,
      name: this.state.currentRole.name,
      description: this.state.currentRole.description,
      acive: status,
    };

    this.props
      .updateRole(this.state.currentRole.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentRole: {
            ...prevState.currentRole,
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
      .updateRole(this.state.currentRole.id, this.state.currentRole)
      .then((reponse) => {
        console.log(reponse);

        this.setState({ message: 'The employee was updated successfully!' });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeRole() {
    this.props
      .deleteRole(this.state.currentRole.id)
      .then(() => {
        this.props.history.push('/roles');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentRole } = this.state;

    return (
      <div>
        {currentRole ? (
          <div className='edit-form'>
            <h4>Role</h4>
            <form>
              <div className='form-group'>
                <label htmlFor='name'>Title</label>
                <input type='text' className='form-control' id='name' value={currentRole.name} onChange={this.onChangeName} />
              </div>
              <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <input
                  type='text'
                  className='form-control'
                  id='description'
                  value={currentRole.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className='form-group'>
                <label>
                  <strong>Status:</strong>
                </label>
                {currentRole.acive ? 'Published' : 'Pending'}
              </div>
            </form>

            {currentRole.acive ? (
              <button className='badge badge-primary mr-2' onClick={() => this.updateStatus(false)}>
                UnPublish
              </button>
            ) : (
              <button className='badge badge-primary mr-2' onClick={() => this.updateStatus(true)}>
                Publish
              </button>
            )}

            <button className='badge badge-danger mr-2' onClick={this.removeRole}>
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
            <p>Please click on a Role...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateRole, deleteRole })(Role);
