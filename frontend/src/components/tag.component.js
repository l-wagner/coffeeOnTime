import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTag, deleteTag } from '../actions/tags';
import TagDataService from '../services/employee.service';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTag = this.getTag.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeTag = this.removeTag.bind(this);

    this.state = {
      currentTag: {
        id: null,
        name: '',
        description: '',
        acive: true,
      },
      message: '',
    };
  }

  componentDidMount() {
    this.getTag(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTag: {
          ...prevState.currentTag,
          name: name,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentTag: {
        ...prevState.currentTag,
        description: description,
      },
    }));
  }

  getTag(id) {
    TagDataService.get(id)
      .then((response) => {
        this.setState({
          currentTag: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentTag.id,
      name: this.state.currentTag.name,
      description: this.state.currentTag.description,
      acive: status,
    };

    this.props
      .updateTag(this.state.currentTag.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentTag: {
            ...prevState.currentTag,
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
      .updateTag(this.state.currentTag.id, this.state.currentTag)
      .then((reponse) => {
        console.log(reponse);

        this.setState({ message: 'The employee was updated successfully!' });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeTag() {
    this.props
      .deleteTag(this.state.currentTag.id)
      .then(() => {
        this.props.history.push('/tags');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentTag } = this.state;

    return (
      <div>
        {currentTag ? (
          <div className='edit-form'>
            <h4>Tag</h4>
            <form>
              <div className='form-group'>
                <label htmlFor='name'>Title</label>
                <input type='text' className='form-control' id='name' value={currentTag.name} onChange={this.onChangeName} />
              </div>
              <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <input
                  type='text'
                  className='form-control'
                  id='description'
                  value={currentTag.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className='form-group'>
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTag.acive ? 'Published' : 'Pending'}
              </div>
            </form>

            {currentTag.acive ? (
              <button className='badge badge-primary mr-2' onClick={() => this.updateStatus(false)}>
                UnPublish
              </button>
            ) : (
              <button className='badge badge-primary mr-2' onClick={() => this.updateStatus(true)}>
                Publish
              </button>
            )}

            <button className='badge badge-danger mr-2' onClick={this.removeTag}>
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
            <p>Please click on a Tag...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateTag, deleteTag })(Tag);
