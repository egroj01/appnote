import React, { Component } from 'react';
import Axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { Button, Tooltip, Icon } from 'antd';

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
    const editarNota = <span> Editar Nota </span>;
    const borrarNota = <span> Borrar Nota </span>;
    return (
      <div className="row">
        {
          this.state.notes.map(note => (
            <div className="col-md-4 p2" key={note._id}>
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h5 className="d-flex align-items-center">{note.title}</h5>
                  <Tooltip placement="left" title={editarNota}>
                    <Link to={`/edit/${note._id}`}>
                      <Icon type="edit" theme="twoTone"/>
                    </Link>
                  </Tooltip>                  
                </div>
                <div className="card-body">
                  <p>Contenido: {note.content}</p>
                  <p>Autor: {note.author}</p>
                  <p>Fecha: {format(note.date)}</p>
                </div>
                <div className="card-footer">
                  <Tooltip placement="right" title={borrarNota}>  
                    <Button type="danger" onClick={() => this.deleteNote(note._id)}>
                      <Icon type="delete"/>
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}
