import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Componentes
import MenuApp from './layout';
import 'jquery';
import 'popper.js';
import 'bootstrap';

// Styles
import 'antd/dist/antd.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  return (
    <Router>
      <MenuApp />
    </Router>  
  );
}

export default App;
