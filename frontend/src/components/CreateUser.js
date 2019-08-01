import React, { Component } from 'react';
import Axios from 'axios'

export default class CreateUser extends Component {

  state = {
    users: [],
    username: ''
  }

  async componentDidMount() {
    this.getUsers();
    // console.log(this.state.users);
  }
  
  getUsers = async () => {
    const res = await Axios.get('http://localhost:4000/api/users');
    // console.log(res);
    this.setState({users: res.data})
  }

  onChangeUsername = (e) => {
    /* console.log(e.target.value) */
    this.setState({
      username: e.target.value
    })
  }
  
  onSubmit = async (e) => {
    e.preventDefault();
    await Axios.post('http://localhost:4000/api/users', {
      username: this.state.username
    });
    this.setState({username: ''});
    this.getUsers();
  }

  deleteUser = async (userId) => {
    // console.log(userId)
    await Axios.delete(`http://localhost:4000/api/users/${userId}`)
    this.getUsers();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <h3> Crear Nuevo Usuario </h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                onChange={this.onChangeUsername}
                value={this.state.username}
              />
            </div>
            <button type="submit" class="btn btn-outline-primary" data-placement="right" title="Guardar Usuario">
              <i className="material-icons">
              assignment_ind
              </i>
            </button>
          </form>
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {
              this.state.users.map(user => (
                <li
                  key={user._id}
                  className="list-group-item list-group-item-action p-2"
                  onDoubleClick={() => this.deleteUser(user._id)}
                >
                  {user.username}
                </li>)
              )
            }
          </ul>
        </div>
      </div>
    )
  }
}
