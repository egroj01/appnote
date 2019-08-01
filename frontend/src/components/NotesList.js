import React, { Component } from 'react';
import Axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

export default class NotesList extends Component {
  state = {
    notes: []
  }

  componentDidMount() {
    this.getNotes();
  }

  getNotes = async () => {
    const res = await Axios.get('http://localhost:4000/api/notes');
    this.setState({
      notes: res.data
    });
    /* console.log(res) */
  }

  deleteNote = async (noteId) => {
    await Axios.delete(`http://localhost:4000/api/notes/${noteId}`);
    this.getNotes();
  }

  render() {
    return (
      <div className="row">
        {
          this.state.notes.map(note => (
            <div className="col-md-4 p2" key={note._id}>
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h5 className="d-flex align-items-center">{note.title}</h5>
                  <Link to={`/edit/${note._id}`} class="btn btn-outline-warning" data-placement="right" title="Editar Nota">
                    <i className="material-icons">
                      edit
                    </i>
                  </Link>
                </div>
                <div className="card-body">
                  <p>Contenido: {note.content}</p>
                  <p>Autor: {note.author}</p>
                  <p>Fecha: {format(note.date)}</p>
                </div>
                <div className="card-footer">
                  <button class="btn btn-outline-danger" onClick={() => this.deleteNote(note._id)} data-placement="right" title="Borrar Nota">
                    <i className="material-icons">
                    delete
                  </i>
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}
