import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="material-icons"> assignment </i>
              <span> NOTAS APP </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link 
                  className="nav-link"
                  to="/"> Notas 
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  <i className="material-icons" data-placement="right" title="Crear Nota"> event_note </i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user"> 
                  <i className="material-icons" data-placement="right" title="Crear Usuario"> person_add </i> 
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
