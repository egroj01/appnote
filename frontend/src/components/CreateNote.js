import React, { Component } from 'react';
import Axios from 'axios';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateNote extends Component {

  state={
    title: '',
    content: '',
    date: new Date(),
    userSelected: '',
    users: [],
    editing: false,
    _id: ''
  }

  async componentDidMount() {
/*     console.log(this.props.match.params) */
    const res = await Axios.get('http://localhost:4000/api/users');
    if (res.data.length > 0) {
      this.setState({
          users: res.data.map(user => user.username),
          userSelected: res.data[0].username
      })
    }
    if (this.props.match.params.id) {
      const res = await Axios.get(`http://localhost:4000/api/notes/${this.props.match.params.id}`);
      console.log(res.data)
      this.setState({
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        userSelected: res.data.author,
        _id: res.data._id,
        editing: true,
      });
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.editing) {
      const updatedNote = {
        title: this.state.title,
        content: this.state.content,
        author: this.state.userSelected,
        date: this.state.date
      };
      await Axios.put(`http://localhost:4000/api/notes/${this.state._id}`, updatedNote);
    } else {
        const newNote = {
          title: this.state.title,
          content: this.state.content,
          author: this.state.userSelected,
          date: this.state.date
      };
      Axios.post('http://localhost:4000/api/notes', newNote);
    }
    window.location.href = '/';
  }

  onInputChange = (e) => {
    // console.log(e.target.name, e.target.value); // para saber que name agarro y que valor
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  onChangeDate = date => {
    this.setState({date});
  }

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Nota</h4>
            <form onSubmit={this.onSubmit}>           
              <div className="form-group">
                <select
                  className="form-control"
                  name="userSelected"
                  onChange={this.onInputChange}
                  value={this.state.userSelected}
                  required
                >
                  {this.state.users.map(user => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Titulo"
                  name="title"
                  onChange={this.onInputChange}
                  value={this.state.title}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Contenido"
                  name="content"
                  onChange={this.onInputChange}
                  value={this.state.content}
                  required
                />
              </div>

              <div className="form-group">
                <Datepicker
                  className="form-control"
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>

              <button type="submit" className="btn btn-outline-success" data-placement="right" title="Guardar Nota">
                <i className="material-icons">
                  assignment_turned_in
                </i>
              </button>

            </form>
        </div>
      </div>
    );
  }
}
