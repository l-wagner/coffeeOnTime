import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveTags, findTagsByName, deleteAllTags } from '../actions/tags';
import { Link } from 'react-router-dom';

class TagsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveTag = this.setActiveTag.bind(this);
    this.findByName = this.findByName.bind(this);
    this.removeAllTags = this.removeAllTags.bind(this);

    this.state = {
      currentTag: null,
      currentIndex: -1,
      searchName: '',
    };
  }

  componentDidMount() {
    this.props.retrieveTags();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  }

  refreshData() {
    this.setState({
      currentTag: null,
      currentIndex: -1,
    });
  }

  setActiveTag(tag, index) {
    this.setState({
      currentTag: tag,
      currentIndex: index,
    });
  }

  removeAllTags() {
    this.props
      .deleteAllTags()
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

    this.props.findTagsByName(this.state.searchName);
  }

  render() {
    const { searchName, currentTag, currentIndex } = this.state;
    const { tags } = this.props;

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
          <h4>Tags List</h4>

          <ul className='list-group'>
            {tags &&
              tags.map((tag, index) => (
                <li
                  className={'list-group-item ' + (index === currentIndex ? 'active' : '')}
                  onClick={() => this.setActiveTag(tag, index)}
                  key={index}>
                  {tag.name}
                </li>
              ))}
          </ul>

          <button className='m-3 btn btn-sm btn-danger' onClick={this.removeAllTags}>
            Remove All
          </button>
        </div>
        <div className='col-md-6'>
          {currentTag ? (
            <div>
              <h4>Tag</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{' '}
                {currentTag.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{' '}
                {currentTag.description}
              </div>
              <div>
                <label>
                  <strong>Icon:</strong>
                </label>{' '}
                {currentTag.icon}
              </div>

              <Link to={'/tags/' + currentTag.id} className='badge badge-warning'>
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tag...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.tags,
  };
};

export default connect(mapStateToProps, {
  retrieveTags,
  findTagsByName,
  deleteAllTags,
})(TagsList);
